const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Direktori tujuan upload
const uploadsDir = path.join(__dirname, "../../public/uploads");

// Memastikan direktori upload ada dan dapat diakses
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ganti dengan /tmp jika menggunakan AWS Lambda atau sistem read-only lainnya
        cb(null, '/tmp');  // Menggunakan folder /tmp yang dapat ditulis pada beberapa platform
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

// Filter untuk tipe file yang diizinkan
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|docx|doc|ppt|pptx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);  // File diterima
    } else {
        cb(new Error("Only images and documents are allowed"), false);  // File ditolak
    }
};

// Konfigurasi multer dengan batasan ukuran dan filter file
const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },  // Batas ukuran file 100 MB
    fileFilter,
});

module.exports = upload;
