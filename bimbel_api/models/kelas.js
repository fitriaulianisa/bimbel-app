const mongoose = require("mongoose");

const kelasSchema = new mongoose.Schema({
    namaKelas: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    tingkat: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Kelas = mongoose.model("Kelas", kelasSchema);

module.exports = Kelas;
