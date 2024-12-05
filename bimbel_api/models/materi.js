const mongoose = require("mongoose");

const materiSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    deskripsi: {
        type: String,
        required: true,
        trim: true,
    },
    pengajar:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Materi = mongoose.model("Materi", materiSchema);

module.exports = Materi;