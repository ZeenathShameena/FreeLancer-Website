const multer = require("multer");
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../files/"), // Save uploaded images to the "files" folder
  filename: (req, file, cb) => {
    cb(null, Date.now() +  path.extname(file.originalname)); // Unique filename
  },
});

// File filter to allow only images
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };

// Multer upload function
const upload = multer({ storage });

module.exports = upload;