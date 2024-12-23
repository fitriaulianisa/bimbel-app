const Guru = require("../models/guru");
const getAllGuru = async (req, res) => {
    try {
        // const guru = await Guru.find();
        
        // Mengambil semua prodi dari database dan populate data fakultas berdasarkan fakultas_id
        const guru = await Guru.find().populate("jenisbimbel_id", "nama singkatan"); // Mengambil field 'nama' dari Fakultas

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
        alamat: req.body.alamat,
        no_hp: req.body.no_hp,
        jenisbimbel_id: req.body.jenisbimbel_id,
        
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
        if (req.body.alamat != null){
            guru.alamat = req.body.alamat;
        }
        if (req.body.no_hp != null){
            guru.no_hp = req.body.no_hp;
        }
        if (req.body.jenisbimbel_id != null){
            guru.jenisbimbel_id = req.body.jenisbimbel_id;
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

