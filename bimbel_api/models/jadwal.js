const mongoose = require("mongoose");

const jadwalSchema = new mongoose.Schema({
    kelas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "kelas",
        required: true,
        
    },
    pengajar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        
    },
    waktuMulai:{
        type: String,
        required: true,

    },
    waktuSelesai:{
        type: String,
        required: true,
        
    },
    topik:{
        type: String,
        required: true,
        
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Jadwal = mongoose.model("Jadwal", jadwalSchema);

module.exports = Jadwal;