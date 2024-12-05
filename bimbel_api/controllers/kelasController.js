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
        nama: req.body.nama,
        deskripsi: req.body.deskripsi,
        pengajar: req.body.pengajar,
        siswa:req.body.siswa,
        materi:req.body.materi,
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

        if (req.body.nama != null){
            kelas.nama = req.body.nama;
        }

        
        if (req.body.deskripsi != null){
            kelas.deskripsi = req.body.deskripsi;
        }
        if (req.body.pengajar != null){
            kelas.pengajar = req.body.pengajar;
        }
        if (req.body.siswa != null){
            kelas.siswa = req.body.siswa;
        }
        if (req.body.materi != null){
            kelas.materi = req.body.materi;
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

