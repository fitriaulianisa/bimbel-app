const mongoose = require("mongoose");
const materiSchema = new mongoose.Schema({
    namamateri: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    deskripsi:{
        type: String,
        required: true,
        trim: true,
    },
    kelas:{
        type: String,
        trim: true,
    },
    
    jenisbimbel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JenisBimbel",
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Materi = mongoose.model("Materi", materiSchema);

module.exports = Materi;