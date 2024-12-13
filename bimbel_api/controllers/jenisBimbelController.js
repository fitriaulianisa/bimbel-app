const JenisBimbel = require("../models/jenisBimbel");
const getAllJenisBimbel = async (req, res) => {
    try {
        const jenisbimbel = await JenisBimbel.find();

        res.status(200).json(jenisbimbel);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getJenisBimbelById = async (req, res) => {
    try {
        const jenisbimbel = await JenisBimbel.findById(req.params.id);
        if (!jenisbimbel)
            return res.status(404).json({message: "Jenis Bimbel not found"});

        res.status(200).json(jenisbimbel);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createJenisBimbel = async (req, res) => {
    const jenisbimbel = new JenisBimbel({
        nama: req.body.nama,
        singkatan: req.body.singkatan,
        harga: req.body.harga,
    })
    try {
        const newjenisBimbel = await jenisbimbel.save();

        res.status(200).json(newjenisBimbel);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const updateJenisBimbel = async (req, res) => {
    try {
        const jenisbimbel = await JenisBimbel.findById(req.params.id);

        if (!jenisbimbel)
            return res.status(404).json({ message: "Jenis Bimbel not found" });

        if (req.body.nama != null){
            jenisbimbel.nama = req.body.nama;
        }

        if (req.body.singkatan != null){
            jenisbimbel.singkatan = req.body.jenisbimbel;
        }
        if (req.body.harga != null){
            jenisbimbel.harga = req.body.harga;
        }

        const updatejenisBimbel = await jenisbimbel.save();

        res.status(200).json(updatejenisBimbel);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deleteJenisBimbel = async (req, res) => {
    try {
        const jenisbimbel = await JenisBimbel.findById(req.params.id);

        if (!jenisbimbel)
            return res.status(404).json({ message: "Jenis Bimbel not found" });

        await jenisbimbel.deleteOne();
        res.status(200).json({message: "Jenis Bimbel deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllJenisBimbel,
    createJenisBimbel,
    getJenisBimbelById,
    updateJenisBimbel,
    deleteJenisBimbel,
};

