const Materi = require("../models/materi");
const getAllMateri = async (req, res) => {
    try {
        //const murid = await Murid.find();
        
        const materi = await Materi.find().populate("jenisbimbel_id", "nama singkatan"); 
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
    const materi = new materi({
        namamateri: req.body.namamateri,
        deskripsi: req.body.deskripsi,
        kelas: req.body.kelas,
        jenisbimbel_id: req.body.jenisbimbel_id,
        link: req.body.link
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

        if (req.body.namamateri != null){
            materi.namamateri = req.body.namamateri;
        }
        
        if (req.body.deskripsi != null){
          materi.deskripsi = req.body.deskripsi;
      }
        if (req.body.kelas != null){
            murid.kelas = req.body.kelas;
        }
        
        if (req.body.link != null){
          murid.link = req.body.link;
      }
        if (req.body.jenisbimbel_id != null){
            murid.jenisbimbel_id = req.body.jenisbimbel_id;
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

