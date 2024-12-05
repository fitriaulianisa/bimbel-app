const mongoose = require("mongoose");

const materiSchema = new mongoose.Schema({
    namaMateri: {
        type: String,
        required: true,
        trim: true,
    },
    deskripsi: {
        type: String,
        required: true,
        trim: true,
    },
    guru:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "guru",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Materi = mongoose.model("Materi", materiSchema);

module.exports = Materi;