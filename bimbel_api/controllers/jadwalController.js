const Jadwal = require("../models/jadwal");
const getAllJadwal = async (req, res) => {
    try {
        const jadwal = await Jadwal.find().populate('kelas').populate('guru');

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
        hari: req.body.hari,
        jam: req.body.jam,
        jenisbimbel: req.body.jenisbimbel,
        ruangKelas:req.body.ruangKelas,
        guru:req.body.guru
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

        if (req.body.hari != null){
            jadwal.hari = req.body.hari;
        }

        
        if (req.body.jam != null){
            jadwal.jam = req.body.jam;
        }
        if (req.body.jenisbimbel != null){
            jadwal.jenisbimbel = req.body.jenisbimbel;
        }
        if (req.body.ruangKelas != null){
            jadwal.ruangKelas = req.body.ruangKelas;
        }
        if (req.body.guru != null){
            jadwal.guru = req.body.guru;
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

