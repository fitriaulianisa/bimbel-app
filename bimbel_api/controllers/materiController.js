const Materi = require("../models/materi");
const JenisBimbel = require("../models/jenisBimbel");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

// Fungsi untuk menambahkan data materi baru
exports.createMateri = async (req, res) => {
  const { namamateri, deskripsi, kelas, jenisbimbel_id } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "File materi is required" });
  }

  try {
    // Validasi Jenis Bimbel
    const jenisbimbel = await JenisBimbel.findById(jenisbimbel_id);
    if (!jenisbimbel) {
      return res.status(404).json({ message: "Jenis Bimbel not found" });
    }
     // Upload file ke Cloudinary
     const fileUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "materi_bimbel", // Folder tempat file disimpan di Cloudinary
    });

    // Membuat instance Materi baru
    const materi = new Materi({
      namamateri,
      deskripsi,
      kelas,
      jenisbimbel_id,
      filemateri: fileUpload.secure_url, // URL file dari Cloudinary
    });

    await materi.save();
    res.status(201).json({ message: "Materi created successfully", materi });
  } catch (error) {
    console.error("Error creating materi:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan semua data materi
exports.getAllMateri = async (req, res) => {
  try {
    const materi = await Materi.find().populate("jenisbimbel_id", "nama");
    res.json(materi);
  } catch (error) {
    console.error("Error fetching materi:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan data materi berdasarkan ID
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
    console.error("Error fetching materi by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk memperbarui data materi
exports.updateMateri = async (req, res) => {
  const { namamateri, deskripsi, kelas, jenisbimbel_id } = req.body;

  try {
    const materi = await Materi.findById(req.params.id);
    if (!materi) {
      return res.status(404).json({ message: "Materi not found" });
    }

    // Hapus file lama jika ada file baru diunggah
    if (req.file && materi.filemateri) {
      const filePublicId = materi.filemateri.split("/").pop().split(".")[0]; // Mendapatkan public_id dari URL
      await cloudinary.uploader.destroy(filePublicId); // Menghapus file lama dari Cloudinary
    }
    // Upload file baru ke Cloudinary
    if (req.file) {
      const fileUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "materi_bimbel", // Folder tempat file disimpan di Cloudinary
      });
      materi.filemateri = fileUpload.secure_url; // URL file baru dari Cloudinary
    }


    // Perbarui field materi
    materi.namamateri = namamateri ?? materi.namamateri;
    materi.deskripsi = deskripsi ?? materi.deskripsi;
    materi.kelas = kelas ?? materi.kelas;
    materi.jenisbimbel_id = jenisbimbel_id ?? materi.jenisbimbel_id;

    await materi.save();
    res.json({ message: "Materi updated successfully", materi });
  } catch (error) {
    console.error("Error updating materi:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus data materi
exports.deleteMateri = async (req, res) => {
  try {
    const materi = await Materi.findByIdAndDelete(req.params.id);
    if (!materi) {
      return res.status(404).json({ message: "Materi not found" });
    }

    // Hapus file dari Cloudinary jika ada
    if (materi.filemateri) {
      const filePublicId = materi.filemateri.split("/").pop().split(".")[0]; // Mendapatkan public_id dari URL
      await cloudinary.uploader.destroy(filePublicId); // Menghapus file dari Cloudinary
    }

    res.json({ message: "Materi deleted successfully" });
  } catch (error) {
    console.error("Error deleting materi:", error);
    res.status(500).json({ message: error.message });
  }
};
