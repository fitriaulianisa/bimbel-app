const Pendaftaran = require("../models/pendaftaran");
const getAllPendaftaran = async (req, res) => {
    try {
        const pendaftaran = await Pendaftaran.find();

        res.status(200).json(pendaftaran);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getPendaftaranById = async (req, res) => {
    try {
        const pendaftaran = await Pendaftaran.findById(req.params.id);
        if (!pendaftaran)
            return res.status(404).json({message: "Pendaftaran not found"});

        res.status(200).json(pendaftaran);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createPendaftaran = async (req, res) => {
    const pendaftaran = new Pendaftaran({
        murid: req.body.murid,
        kelas: req.body.kelas,
        status: req.body.status,
        tglPendaftaran: req.body.tglPendaftaran,

    })
    try {
        const newPendaftaran = await pendaftaran.save();

        res.status(200).json(newPendaftaran);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const updatePendaftaran = async (req, res) => {
    try {
        const pendaftaran = await Pendaftaran.findById(req.params.id);

        if (!pendaftaran)
            return res.status(404).json({ message: "Pendaftaran not found" });

        if (req.body.siswa != null){
            pendaftaran.siswa = req.body.siswa;
        }

        if (req.body.kelas != null){
            pendaftaran.kelas = req.body.kelas;
        }
        if (req.body.status != null){
            pendaftaran.status = req.body.status;
        }
        if (req.body.tglPendaftaran != null){
            pendaftaran.tglPendaftaran = req.body.tglPendaftaran;
        }

        const updatePendaftaran = await pendaftaran.save();

        res.status(200).json(updatePendaftaran);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deletePendaftaran = async (req, res) => {
    try {
        const pendaftaran = await Pendaftaran.findById(req.params.id);

        if (!pendaftaran)
            return res.status(404).json({ message: "Pendaftaran not found" });

        await pendaftaran.deleteOne();
        res.status(200).json({message: "Pendaftaran deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllPendaftaran,
    createPendaftaran,
    getPendaftaranById,
    updatePendaftaran,
    deletePendaftaran,
};

