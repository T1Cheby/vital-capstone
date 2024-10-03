const firebaseApp = require("../helper/firebaseApp");
const { getStorage, ref, getDownloadURL } = require('firebase/storage');
const { getDatabase, ref: dbRef, get, set, push, query, orderByChild, equalTo } = require("firebase/database");
const db = getDatabase(firebaseApp);
const { createWorker } = require('tesseract.js');

const storage = getStorage(firebaseApp);


exports.extractText = async (fileName) => {
    const fileReference = ref(storage, `files/${fileName}`);

    const url = await getDownloadURL(fileReference);

    // Use tesseract.js to extract text from image
    const w = await createWorker("vie");
    const { data: { text } } = await w.recognize(url);
    await w.terminate();
    const convertedTextsReference = dbRef(db, "convertedTexts");
    const duplicateCheck = query(convertedTextsReference, orderByChild("fileName"), equalTo(fileName));
    const fileConverted = await get(duplicateCheck);

    if (fileConverted.exists()) {
        return { message: "This image is already converted" };
    }
    const newTextReference = push(convertedTextsReference);
    await set(newTextReference, { 
        text: text,
        fileName: fileName,
        time: new Date().toISOString()
    });
    return { text: "Text extracted from image successfully", text };
};
