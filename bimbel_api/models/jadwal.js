const mongoose = require("mongoose");

const jadwalSchema = new mongoose.Schema({
    hari: {
        type: String,
        required: true,
        
    },
    jam: {
        type: String,
        required: true,
        
    },
    kelas: {
        type: String,
        required: true,
    },

    jenisbimbel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JenisBimbel",
        required: true,
    },
    ruangkelas:{
        type: String,
        required: true,
        
    },
    guru_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guru",
        required: true,
        
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Jadwal = mongoose.model("Jadwal", jadwalSchema);

module.exports = Jadwal;