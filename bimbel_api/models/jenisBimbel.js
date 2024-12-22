const mongoose = require("mongoose");

const jenisbimbelSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    singkatan: {
        type: String,
        required: true,
        trim: true,
    },
    harga:{
        type: String,
        required: true,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const JenisBimbel = mongoose.model("JenisBimbel", jenisbimbelSchema);

module.exports = JenisBimbel;