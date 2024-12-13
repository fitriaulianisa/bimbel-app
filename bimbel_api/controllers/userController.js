const User = require("../models/user");
const getAllUser = async (req, res) => {
    try {
        const user = await user.find();

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({message: "User not found"});

        res.status(200).json(kelas);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createUser = async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    })
    try {
        const newUser = await user.save();

        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user)
            return res.status(404).json({ message: "User not found" });

        if (req.body.email != null){
            kelas.email = req.body.email;
        }

        
        if (req.body.password != null){
            kelas.password = req.body.password;
        }
        if (req.body.role != null){
            kelas.role = req.body.role;
        }

        const updateUser = await User.save();

        res.status(200).json(updateUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user)
            return res.status(404).json({ message: "User not found" });

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

