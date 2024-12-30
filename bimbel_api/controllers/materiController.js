const Materi = require("../models/materi");
const JenisBimbel = require("../models/jenisBimbel");
const cloudinary = require("cloudinary").v2;

// Fungsi untuk menambahkan materi baru
exports.createMateri = async (req, res) => {
  const { namamateri, deskripsi, kelas, jenisbimbel_id } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "File materi is required" });
  }

  try {
    const jenisbimbel = await JenisBimbel.findById(jenisbimbel_id);
    if (!jenisbimbel) {
      return res.status(404).json({ message: "Jenis Bimbel not found" });
    }

    const fileUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "materi_bimbel",
    });

    const materi = new Materi({
      namamateri,
      deskripsi,
      kelas,
      jenisbimbel_id,
      filemateri: fileUpload.secure_url,
    });

    await materi.save();
    res.status(201).json({ message: "Materi created successfully", materi });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan semua materi
exports.getAllMateri = async (req, res) => {
  try {
    const materi = await Materi.find().populate("jenisbimbel_id", "nama");
    res.json(materi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan materi berdasarkan ID
exports.getMateriById = async (req, res) => {
  try {
    const materi = await Materi.findById(req.params.id).populate(
      "jenisbimbel_id",
      "nama"
    );
    if (!materi) {
      return res.status(404).json({ message: "Materi not found" });
    }
    res.json(materi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk memperbarui materi
exports.updateMateri = async (req, res) => {
  const { namamateri, deskripsi, kelas, jenisbimbel_id } = req.body;

  try {
    const materi = await Materi.findById(req.params.id);
    if (!materi) {
      return res.status(404).json({ message: "Materi not found" });
    }

    if (req.file) {
      const fileUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "materi_bimbel",
      });
      materi.filemateri = fileUpload.secure_url;
    }

    materi.namamateri = namamateri ?? materi.namamateri;
    materi.deskripsi = deskripsi ?? materi.deskripsi;
    materi.kelas = kelas ?? materi.kelas;
    materi.jenisbimbel_id = jenisbimbel_id ?? materi.jenisbimbel_id;

    await materi.save();
    res.json({ message: "Materi updated successfully", materi });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus materi
exports.deleteMateri = async (req, res) => {
  try {
    const materi = await Materi.findByIdAndDelete(req.params.id);
    if (!materi) {
      return res.status(404).json({ message: "Materi not found" });
    }

    if (materi.filemateri) {
      const filePublicId = materi.filemateri.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(filePublicId);
    }

    res.json({ message: "Materi deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
