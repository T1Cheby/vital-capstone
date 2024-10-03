
// const addFilenameToReq = (req, res, next) => {
//     if (req.file) {
//         const filename = req.file.originalname.split(".")[0];
//         const type = req.file.originalname.split(".")[1];
//         req.file.filename = filename + '-' + Date.now() + "." + type;       
//     }
//     next();
// };

// module.exports = addFilenameToReq;