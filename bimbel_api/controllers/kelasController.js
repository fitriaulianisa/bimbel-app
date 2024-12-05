const Kelas = require("../models/kelas");
const getAllKelas = async (req, res) => {
    try {
        const kelas = await Kelas.find();

        res.status(200).json(kelas);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getKelasById = async (req, res) => {
    try {
        const kelas = await Kelas.findById(req.params.id);
        if (!kelas)
            return res.status(404).json({message: "Kelas not found"});

        res.status(200).json(kelas);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createKelas = async (req, res) => {
    const kelas = new Kelas({
        namaKelas: req.body.namaKelas,
        tingkat: req.body.tingkat,
    })
    try {
        const newKelas = await kelas.save();

        res.status(200).json(newKelas);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const updateKelas = async (req, res) => {
    try {
        const kelas = await Kelas.findById(req.params.id);

        if (!kelas)
            return res.status(404).json({ message: "Kelas not found" });

        if (req.body.namaKelas != null){
            kelas.namaKelas = req.body.namaKelas;
        }

        
        if (req.body.tingkat != null){
            kelas.tingkat = req.body.tingkat;
        }

        const updateKelas = await kelas.save();

        res.status(200).json(updateKelas);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deleteKelas = async (req, res) => {
    try {
        const kelas = await Kelas.findById(req.params.id);

        if (!kelas)
            return res.status(404).json({ message: "Kelas not found" });

        await kelas.deleteOne();
        res.status(200).json({message: "Kelas deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllKelas,
    createKelas,
    getKelasById,
    updateKelas,
    deleteKelas,
};

