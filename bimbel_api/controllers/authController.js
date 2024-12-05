const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// fungsi register
exports.register = async (req, res) => {
    const {nama, email, password, role} = req.body;
    try{
        // cek email sudah terdaftar atau belum
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({ message: "User already exists!"});
        }
        // jika email belum terdaftar
        user = new User({nama, email, password, role});
        await user.save(); // simpan ke mongoDB

        // proses token
        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h" // masa berlaku token 1 jam
        });

        res.json({ token }) // kirim token sebagai response
    } catch (error) {
        res.status(500).json({ message: error.message});

    }
};

// fungsi login
exports.login = async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return re.status(400).json({message: "Invalid email or password"});
        }
        // jika email ditemukan
        // bandingkan password yang dikirim
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // jika email dan password benar
        // buat token jwt
        const payload = { userId: user.id, role: user.role};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h" // masa berlaku token 1 jam
        });

        res.json({ token }) // kirim token sebagai response
  
    }   catch (error){
        res.status(500).json({ message: error.message});
    }
};