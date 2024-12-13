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
    jenisbimbel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jenisbimbel",
    },
    ruangkelas:{
        type: String,
        required: true,
        
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

const Jadwal = mongoose.model("Jadwal", jadwalSchema);

module.exports = Jadwal;