// const firebaseApp = require("../helper/firebaseApp");
// const { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } = require("firebase/storage");
// const storage = getStorage(firebaseApp);
// const https = require('https');
// const fs = require('fs');
// const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const File = require('../models/file');
const { where } = require('sequelize');
const { version } = require('os');
// const { version } = require("os");

// support adding file to other services
// suport adding notes to storage => a text file that can be modififed 
// check the FE and flutter
// exports.uploadFile = async (file) => {
//     try {
//         // const fileBuffer = fs.readFileSync(file.path);
//         console.log(file);
//         const imagesRef = ref(storage, `files/${file.filename}`);
//         const metadata = {
//             contentType: file.mimetype
//         };


//         await uploadBytes(imagesRef, file.buffer, metadata);
//         console.log('Uploaded a blob or file!');

//         // fs.unlinkSync(file.path);
//         return { message: "File uploaded successfully!", file };
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         return { message: "Error uploading file" };
//     }
// }


const ensureDirectoryExistence = async (dir) => {
    try {
        await fs.mkdir(dir, { recursive: true });
        console.log(`Directory ${dir} ensured to exist.`);
    } catch (err) {
        console.error(`An error occurred while ensuring the directory ${dir}:`, err);
    }
};

async function checkFileExists(filePath) {
    try {
        await fs.access(filePath);
        return true; 
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false; 
        } else {
            throw error;
        }
    }
}

const createFileRecord = async (fileData) => {
    try {
        return await File.create(fileData);
    } catch (error) {
        console.error("Error creating file record:", error);
        throw new Error("Error creating file record");
    }
};


const writeFileAndCheck = async (filePath, fileBuffer) => {
    try {
        if (fileBuffer instanceof ArrayBuffer) {
            fileBuffer = Buffer.from(fileBuffer);
        }
        await fs.writeFile(filePath, fileBuffer);
        return await checkFileExists(filePath);
    } catch (error) {
        console.error("Error writing file or checking existence:", error);
        throw new Error("Error writing file or checking existence");
    }
};



const handleFileUpload = async (file, newFilename, filePath, hash, timestamp, version) => {
    try {
    const fileData = {
        filename: newFilename,
        filepath: filePath,
        hash,
        size: file.size,
        timestamp,
        version,
        deleted: false
    };

    

    const newFile = await createFileRecord(fileData);

    if (!newFile) {
        console.log("Problem occurred during the uploading process or file name is incorrect.");
        return { message: 'Error uploading file' };
    }

    const fileWritten = await writeFileAndCheck(filePath, file.buffer);

    if (!fileWritten) {
        console.log("Problem occurred during the writing process or file name is incorrect.");
        return { message: 'Error uploading file' };
    }

    return { message: 'File uploaded successfully!', file: newFile };
    } catch (error) {
        console.error("Error handling file:", error);
        throw new Error("Error handling file");
    }
};

//v.02
exports.uploadFile = async (file) => {
    try {
        const timestamp = Date.now();
        const fileName = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const newFilename = `${fileName}-${timestamp}.${type}`;
        const filePath = path.join(__dirname, '../uploads', newFilename);
        const dir = path.dirname(filePath);

        await ensureDirectoryExistence(dir);

        const hash = await crypto.createHash('sha256').update(file.buffer).digest('hex');
        const duplicateFile = await File.findOne({ where: { hash } });
        const existFileinDB = await File.findOne({ where: { filename: newFilename } });
        const existFileinStorage = await checkFileExists(filePath);
        const checkDuplicate = duplicateFile ? true : false;
        const checkInDB = existFileinStorage ? true : false;
        // console.log(checkDuplicate, checkInDB);
        if (!existFileinDB && !checkDuplicate) {
            return await handleFileUpload(file, newFilename, filePath, hash, timestamp, 1);
        }
        // console.log(duplicateFile, existFileinDB, existFileinStorage);

        if (duplicateFile) {
            // console.log(duplicateFile)
            const checkExistFile = await checkFileExists(duplicateFile.filepath);
            if (!checkExistFile) {
                // console.log(duplicateFile.filepath);
                return await handleFileUpload(file, newFilename, filePath, hash, timestamp, 1);
            }
            // console.log(duplicateFile);

            const [affectedRows] = await File.update(
                { timestamp },
                { where: { hash } }
            );

            if (affectedRows === 0) {
                console.log("Problem occurred during the updating process or file name is incorrect.");
                return { message: 'Error uploading file' };
            }
        }

        return { message: 'File uploaded successfully!' };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { message: "Error uploading file" };
    }
};


exports.updateFile = async (file, updateName) => {
    try {
        const timestamp = Date.now();
        const fileName = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const newFilename = `${fileName}-${timestamp}.${type}`;
        const existFileinDB = await File.findOne({ where: { filename: updateName } });
        const filePath = path.join(__dirname, '../uploads', updateName);
        const existFileinStorage = await checkFileExists(filePath);
        const fileUpdatePath = path.join(__dirname, '../uploads', newFilename);
        const dir = path.dirname(filePath);
        await ensureDirectoryExistence(dir);


        if(!existFileinDB){
            return { message: 'Error updating file' };
        }

        if(!existFileinStorage){
            return { message: 'Error updating file' };
        }
        const hash = await crypto.createHash('sha256').update(file.buffer).digest('hex');
        const duplicateFile = await File.findOne({ where: { hash, filename: updateName } });

        const updatedVersion = existFileinDB.version ? existFileinDB.version  + 1 : 2;

        if (duplicateFile) {
            const [affectedRows] = await File.update(
                { timestamp },
                { where: { filename: updateName, hash } }
            );

            if (affectedRows === 0) {
                console.log("Problem occurred during the updating process or file name is incorrect.");
                return { message: 'Error updating file' };
            }
            return { message: 'File updated successfully!' };
        }

        await fs.writeFile(fileUpdatePath, file.buffer);
        const checkWrite = await checkFileExists(fileUpdatePath);
        if (!checkWrite) {
            return { message: 'Error updating file: File write failed' };
        }

        await handleFileUpload(file, updateName, fileUpdatePath, hash, timestamp, updatedVersion);
        
        return { message: 'File updated successfully!' };
        
    } catch (error) {
        console.error("Error updating file:", error);
        return { message: "Error updating file" };
    }
};



// exports.downloadFile = async (file) => {
//     try {
//         const imagesRef = ref(storage, `files/${file.name}`);
//         const url = await getDownloadURL(imagesRef);
//         if (url) {
//             const data = await new Promise((resolve, reject) => {
//                 https.get(url, (res) => {
//                     console.log('Response status code:', res.statusCode); // Log status code
//                     console.log('Response headers:', res.headers); // Log headers

//                     let data = [];

//                     res.on('data', (chunk) => {
//                         // console.log(`Received chunk of size: ${chunk.length} bytes`); // Log the size of each chunk
//                         data.push(chunk);
//                     });

//                     res.on('end', () => {
//                         const buffer = Buffer.concat(data);
//                         // console.log("Downloaded data length:", buffer.length); // Debugging line
//                         resolve(buffer);
//                     });

//                     res.on('error', (e) => {
//                         console.error('Error during download:', e); // Log download error
//                         reject(e);
//                     });
//                 });
//             });

//             // add more propertiese to file
//             // {
//             //     size: "",
//             //     location: "",
//             //     images: ""
//             // }
//             return { message: "File downloaded successfully!", file: data };
//         } else {
//             console.error('Error getting download URL');
//             return { message: "Error getting download URL" };
//         }
//     } catch (error) {
//         console.error("An error occurred:", error);
//         return { message: "Error downloading file" };
//     }
// };

exports.deleteFile = async (fileName, version) => {
    try {
        // Retrieve file details from database
        let ver = (version === "latest" ? (await File.findAll({where: {fileName}})).length : version);
        const fileToDelete = await File.findOne({where: {
            fileName,
            version: version
        }});
        if (!fileToDelete) {
            return { message: 'File not found' };
        }

        
        const checkFile = await checkFileExists(fileToDelete.filepath);
        if (!checkFile) {
            return { message: 'Error deleting file' };
        }
        

        await fs.unlink(fileToDelete.filepath);

        const checkFileExist = await checkFileExists(fileToDelete.filepath);
        if (checkFileExist){
            return { message: 'Error deleting file' };
        }


        

        // Delete file record from database
        const [affectedRows] = await File.update({deleted: true}, {where: {
            fileName, version: version
        }});

        if (affectedRows === 0) {
            console.log("Problem occurred during the deleting process or file name is incorrect.");
            return { message: 'Error deleting file' };
        }

        return { message: 'File deleted successfully!' };
        
    } catch (err) {
        throw new Error(`Error deleting file: ${err.message}`);
    }// 
};

// exports.deleteFile = async (file) => {
//     try {
//         const imagesRef = ref(storage, `images/${file.name}`);
//         await deleteObject(imagesRef);
//         console.log("Deleted File Successfully!");
//         return { message: "File deleted successfully!" };
//     } catch (error) {
//         console.error("Failed to delete file: ", error);
//         return { message: "Error deleting file" };
//     }
// };

exports.downloadFile = async (fileName, version) => {
    try {
        // Retrieve file details from database
        let ver = (version === "latest" ? (await File.findAll({ where: { fileName } })).length : version);

        const fileToDownload = await File.findOne({
            where: {
                fileName,
                version: ver
            }
        });

        if (!fileToDownload) {
            return { message: 'File not found' };
        }


        const checkFileExist = await checkFileExists(fileToDownload.filepath);
        if (!checkFileExist) {
            return { message: 'File not found' };
        }

        const file = await fs.readFile(fileToDownload.filepath);
        if(!file){
            return { message: 'Error downloading file' };
        }

        return { message: 'File downloaded successfully!', file };

    } catch (err) {
        throw new Error(`Error downloading file: ${err.message}`);
    }
};

// exports.getUrl = async (file) => {
//     try {
//         const imagesRef = ref(storage, `files/${file.filename}`);
//         const url = await getDownloadURL(imagesRef);
//         if (url) {
//             return url;
//          } else {
//             console.error('Error getting download URL');
//             return { message: "Error getting download URL" };
//         }
//     } catch (error) {
//         console.error("An error occurred:", error);
//         return { message: "Error downloading file" };
//     }
// }