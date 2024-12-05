const mongoose = require("mongoose");

const pendaftaranSchema = new mongoose.Schema(
    {
        siswa: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Siswa",
            required: true,
        },
        kelas: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Kelas",
            required: true,
        },
        status: {
            type: String,
            enum: ["aktif", "selesai", "dibatalkan"],
            default: "aktif", 
        },
        tglPendaftaran: {
            type: Date,
            default: Date.now,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        
    },
);

pendaftaranSchema.pre("save", function (next) {
    if (this.isModified("status") && this.status === "selesai") {
        this.tglSelesai = new Date();
    }
    next();
});

const Pendaftaran = mongoose.model("Pendaftaran", pendaftaranSchema);

module.exports = Pendaftaran;
