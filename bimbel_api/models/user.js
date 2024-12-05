const mongoose = require("mongoose");
const bcrypt = require ("bcryptjs");

const userSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin","siswa"],
        default: "user",
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },

});

userSchema.pre("save", async function (next) {
    // jika password tidak diubah, lanjutkan tanpa enksripsi
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // enkripsi password
    next();
});

module.exports = mongoose.model('User', userSchema);
