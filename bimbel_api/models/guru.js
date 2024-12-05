const mongoose = require("mongoose");

const guruSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    no_hp:{
        type: String,
        required: true,
        trim: true,
    },
    alamat:{
        type: String,
        trim: true,
    },
    tglLahir:{
        type: Date,
    },
    kelas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "kelas",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Guru = mongoose.model("Guru", guruSchema);

module.exports = Guru;