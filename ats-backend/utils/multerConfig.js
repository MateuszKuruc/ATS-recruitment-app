// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Set the destination directory for uploaded files
//   },
//   filename: function (req, file, cb) {
//     // cb(null, Date.now() + '-' + file.originalname); // Set the filename
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

// AWS

const multer = require("multer");

const upload = multer();

module.exports = upload;
