const multer = require("multer");
const fs = require('fs');
const path = require('path');

// const ensureDirectoryExistence = (dir) => {
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
// };

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath = path.join("./", 'public');
//         ensureDirectoryExistence(uploadPath);
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         const type = file.mimetype.split("/")[1];
//         cb(null, file.fieldname + '-' + Date.now() + "." + type);
//     },
// });
const storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// might modify this to use the memory one instead of disk

module.exports = upload;