const Materi = require("../models/materi");
const getAllMateri = async (req, res) => {
    try {
        const materi = await Materi.find();

        res.status(200).json(materi);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getMateriById = async (req, res) => {
    try {
        const materi = await Materi.findById(req.params.id);
        if (!materi)
            return res.status(404).json({message: "Materi not found"});

        res.status(200).json(materi);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createMateri = async (req, res) => {
    const materi = new Materi({
        namaMateri: req.body.namaMateri,
        deskripsi: req.body.deskripsi,
        guru: req.body.guru,
    })
    try {
        const newMateri = await materi.save();

        res.status(200).json(newMateri);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const updateMateri = async (req, res) => {
    try {
        const materi = await Materi.findById(req.params.id);

        if (!materi)
            return res.status(404).json({ message: "Materi not found" });

        if (req.body.namaMateri != null){
            materi.namaMateri = req.body.namaMateri;
        }

        if (req.body.deskripsi != null){
            materi.deskripsi = req.body.deskripsi;
        }
        if (req.body.guru != null){
            materi.guru = req.body.guru;
        }

        const updateMateri = await materi.save();

        res.status(200).json(updateMateri);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deleteMateri = async (req, res) => {
    try {
        const materi = await Materi.findById(req.params.id);

        if (!materi)
            return res.status(404).json({ message: "Materi not found" });

        await materi.deleteOne();
        res.status(200).json({message: "Materi deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllMateri,
    createMateri,
    getMateriById,
    updateMateri,
    deleteMateri,
};

