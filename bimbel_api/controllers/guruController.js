const Guru = require("../models/guru");
const getAllGuru = async (req, res) => {
    try {
        const guru = await Guru.find();

        res.status(200).json(guru);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getGuruById = async (req, res) => {
    try {
        const guru = await Guru.findById(req.params.id);
        if (!guru)
            return res.status(404).json({message: "Guru not found"});

        res.status(200).json(guru);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createGuru = async (req, res) => {
    const guru = new Guru({
        nama: req.body.nama,
        email: req.body.email,
        no_hp: req.body.no_hp,
        alamat: req.body.alamat,
        tglLahir: req.body.tglLahir,
        kelas: req.body.kelas,
    })
    try {
        const newGuru = await guru.save();

        res.status(200).json(newGuru);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const updateGuru = async (req, res) => {
    try {
        const guru = await Guru.findById(req.params.id);

        if (!guru)
            return res.status(404).json({ message: "Guru not found" });

        if (req.body.nama != null){
            guru.nama = req.body.nama;
        }

        if (req.body.email != null){
            guru.email = req.body.email;
        }
        if (req.body.no_hp != null){
            guru.no_hp = req.body.no_hp;
        }
        if (req.body.alamat != null){
            guru.alamat = req.body.alamat;
        }
        if (req.body.tglLahir != null){
            guru.tglLahir = req.body.tglLahir;
        }
        if (req.body.kelas != null){
            guru.kelas = req.body.kelas;
        }

        const updateGuru = await guru.save();

        res.status(200).json(updateGuru);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deleteGuru = async (req, res) => {
    try {
        const guru = await Guru.findById(req.params.id);

        if (!guru)
            return res.status(404).json({ message: "Guru not found" });

        await guru.deleteOne();
        res.status(200).json({message: "Guru deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllGuru,
    createGuru,
    getGuruById,
    updateGuru,
    deleteGuru,
};

