const Jadwal = require("../models/jadwal");
const getAllJadwal = async (req, res) => {
    try {
        const jadwal = await Jadwal.find().populate('kelas').populate('pengajar');

        res.status(200).json(jadwal);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getJadwalById = async (req, res) => {
    try {
        const jadwal = await Jadwal.findById(req.params.id);
        if (!jadwal) {
            return res.status(404).json({message: "Jadwal not found"});
        }
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        
        res.status(200).json(jadwal);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createJadwal = async (req, res) => {
    const jadwal = new Jadwal({
        kelas: req.body.kelas,
        pengajar: req.body.pengajar,
        waktuMulai: req.body.waktuMulai,
        waktuSelesai:req.body.waktuSelesai,
        topik:req.body.topik
    })
    try {
        const newJadwal = await jadwal.save();

        res.status(200).json(newJadwal);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const updateJadwal = async (req, res) => {
    try {
        const jadwal = await Jadwal.findById(req.params.id);

        if (!jadwal)
            return res.status(404).json({ message: "Jadwal not found" });

        if (req.body.kelas != null){
            jadwal.kelas = req.body.kelas;
        }

        
        if (req.body.pengajar != null){
            jadwal.pengajar = req.body.pengajar;
        }
        if (req.body.waktuMulai != null){
            jadwal.waktuMulai = req.body.waktuMulai;
        }
        if (req.body.waktuSelesai != null){
            jadwal.waktuSelesai = req.body.waktuSelesai;
        }
        if (req.body.topik != null){
            jadwal.topik = req.body.topik;
        }

        const updateJadwal = await jadwal.save();

        res.status(200).json(updateJadwal);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deleteJadwal = async (req, res) => {
    try {
        const jadwal = await Jadwal.findById(req.params.id);

        if (!jadwal)
            return res.status(404).json({ message: "Jadwal not found" });

        await jadwal.deleteOne();
        res.status(200).json({message: "Jadwal deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllJadwal,
    createJadwal,
    getJadwalById,
    updateJadwal,
    deleteJadwal,
};

