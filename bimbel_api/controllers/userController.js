const User = require("../models/user");
const getAllUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin'){
            return res.status(403).json({ message: 'Access denied. '});
        }
        // const user = await user.find(); //sebelum diperbaiki
        const user = await User.find(); // setelah diperbaiki

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createUser = async (req, res) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    })
    try {
        const newUser = await user.save();

        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};
const bcrypt = require("bcryptjs");
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // if (req.body.email != null){     KODINGAN SEBELUM DIPERBAIKI
        //     kelas.email = req.body.email; 
        // }

        
        // if (req.body.password != null){
        //     kelas.password = req.body.password;
        // }
        // if (req.body.role != null){
        //     kelas.role = req.body.role;
        // }
         if (req.body.email != null){            //KODINGAN SETELAH DIPERBAIKI   
            user.email = req.body.email; // salah memasukkan harusnya user.email bukan kelas.email
        }

        
        if (req.body.password != null){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        if (req.body.role != null){
            user.role = req.body.role;
        }
        // const updatedUser = await User.save() // sebelum diperbaiki
        const updatedUser = await user.save(); // setelah diperbaiki

        res.status(200).json({ message: "User Updated Successfullt"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.deleteOne();
        res.status(200).json({message: "User deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
