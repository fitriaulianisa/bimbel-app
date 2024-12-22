const Murid = require("../models/murid");
const getAllMurid = async (req, res) => {
    try {
        //const murid = await Murid.find();
        
        const murid = await Murid.find().populate("jenisbimbel_id", "nama singkatan"); 
        res.status(200).json(murid);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getMuridById = async (req, res) => {
    try {
        const murid = await Murid.findById(req.params.id);
        if (!murid)
            return res.status(404).json({message: "Murid not found"});

        res.status(200).json(murid);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createMurid = async (req, res) => {
    const murid = new Murid({
        nama: req.body.nama,
        alamat: req.body.alamat,
        kelas: req.body.kelas,
        no_hp: req.body.no_hp,
        no_hpOrtu: req.body.no_hpOrtu,
        asal_sekolah: req.body.asal_sekolah,
        jenisbimbel_id: req.body.jenisbimbel_id
    })
    try {
        const newMurid = await murid.save();

        res.status(200).json(newMurid);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const updateMurid = async (req, res) => {
    try {
        const murid = await Murid.findById(req.params.id);

        if (!murid)
            return res.status(404).json({ message: "Murid not found" });

        if (req.body.nama != null){
            murid.nama = req.body.nama;
        }
        if (req.body.alamat != null){
            murid.alamat = req.body.alamat;
        }
        if (req.body.kelas != null){
            murid.tglLahir = req.body.tglLahir;
        }
        if (req.body.no_hp != null){
            murid.no_hp = req.body.no_hp;
        }
        if (req.body.no_hpOrtu != null){
            murid.no_hpOrtu = req.body.no_hpOrtu;
        }
        if (req.body.asal_sekolah != null){
            murid.asal_sekolah = req.body.asal_sekolah;
        }
        if (req.body.jenisbimbel_id != null){
            murid.jenisbimbel_id = req.body.jenisbimbel_id;
        }

        const updateMurid = await murid.save();

        res.status(200).json(updateMurid);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const deleteMurid = async (req, res) => {
    try {
        const murid = await Murid.findById(req.params.id);

        if (!murid)
            return res.status(404).json({ message: "Murid not found" });

        await murid.deleteOne();
        res.status(200).json({message: "Murid deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllMurid,
    createMurid,
    getMuridById,
    updateMurid,
    deleteMurid,
};

