const mongoose = require("mongoose");
const JenisBimbel = require("./jenisBimbel");

const muridSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    alamat:{
        type: String,
        trim: true,
    },
    kelas:{
        type: String,
        trim: true,
    },
    no_hp:{
        type: String,
        required: true,
        trim: true,
    },
    no_hpOrtu:{
        type: String,
        required: true,
        trim: true,
    },
    asal_sekolah:{
        type: String,
        required: true,
        trim: true,
    },
    JenisBimbel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jenis Bimbel",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Murid = mongoose.model("Murid", muridSchema);

module.exports = Murid;