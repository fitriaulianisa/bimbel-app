const mongoose = require("mongoose");
const pembayaranSchema = new mongoose.Schema({
    tgl_pembayaran: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    pembayaran_bln:{
        type: String,
        trim: true,
    },
    jml_transaksi:{
        type: String,
        trim: true,
    },
    no_rek:{
        type: String,
        required: true,
        trim: true,
    },
    
    validasi:{
        type: String,
        enum: ["Y","T"],
        required: true,
        
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Pembayaran = mongoose.model("Pembayaran", pembayaranSchema);

module.exports = Pembayaran;