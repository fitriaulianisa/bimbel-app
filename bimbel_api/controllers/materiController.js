// Mengimpor model Mahasiswa dan Prodi, serta modul path dan fs untuk pengelolaan file
const Materi = require("../models/materi");
const JenisBimbel = require("../models/jenisBimbel");
const path = require("path");
const fs = require("fs");

// Fungsi untuk menambahkan data mahasiswa baru
exports.createMateri = async (req, res) => {
  const {  namamateri, deskripsi, kelas, jenisbimbel_id } = req.body; // Destrukturisasi data dari body request

  if (!req.file) {
    // Validasi jika file foto tidak ada
    return res.status(400).json({ message: "File foto is required" });
  }

  try {
    const jenisbimbel = await JenisBimbel.findById(jenisbimbel_id); // Mencari Prodi berdasarkan ID
    if (!jenisbimbel) return res.status(404).json({ message: "Jenis Bimbel not found" }); // Jika Prodi tidak ditemukan

    // Membuat instance Mahasiswa baru
    const materi = new Materi({
      
      namamateri,
      deskripsi,
      kelas,
      jenisbimbel_id,
      filemateri: req.file ? req.file.path : null, // Simpan path file jika ada
    });

    await materi.save(); // Menyimpan data mahasiswa ke database
    res.status(201).json(materi); // Mengembalikan respon sukses
  } catch (error) {
    res.status(500).json({ message: error.message }); // Menangani error
  }
};

// Fungsi untuk mendapatkan semua data mahasiswa
exports.getAllMateri = async (req, res) => {
  try {
    const materi = await Materi.find().populate("jenisbimbel_id", "nama"); // Mengambil data mahasiswa dan relasi Prodi
    res.json(materi); // Mengembalikan data mahasiswa
  } catch (error) {
    res.status(500).json({ message: error.message }); // Menangani error
  }
};

// Fungsi untuk mendapatkan data mahasiswa berdasarkan ID
exports.getMateriById = async (req, res) => {
  try {
    const materi = await Materi.findById(req.params.id).populate(
      "jenisbimbel_id",
      "nama"
    ); // Mengambil data mahasiswa berdasarkan ID dan relasi Prodi
    if (!materi)
      return res.status(404).json({ message: "Materi not found" }); // Jika mahasiswa tidak ditemukan
    res.json(materi); // Mengembalikan data mahasiswa
  } catch (error) {
    res.status(500).json({ message: error.message }); // Menangani error
  }
};

// Fungsi untuk memperbarui data mahasiswa
exports.updateMateri = async (req, res) => {
  const { namamateri, deskripsi, kelas, jenisbimbel_id } = req.body;

  try {
    const materi = await Materi.findById(req.params.id);
    if (!materi) return res.status(404).json({ message: "Materi not found" });

    if (req.file) {
      // Hapus file lama jika ada
      if (materi.filemateri) {
        const oldPath = path.join(__dirname, "../", materi.filemateri);
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Error deleting old file:", err);
        });
      }
      materi.filemateri = req.file.path; // Assign file baru
    }

    // Perbarui field materi
    materi.namamateri = namamateri ?? materi.namamateri;
    materi.deskripsi = deskripsi ?? materi.deskripsi;
    materi.kelas = kelas ?? materi.kelas;
    materi.jenisbimbel_id = jenisbimbel_id ?? materi.jenisbimbel_id;
    

    await materi.save();
    res.json(materi);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus data mahasiswa
exports.deleteMateri = async (req, res) => {
  try {
    const materi = await Materi.findByIdAndDelete(req.params.id); // Menghapus mahasiswa berdasarkan ID
    if (!materi)
      return res.status(404).json({ message: "Materi not found" }); // Jika mahasiswa tidak ditemukan

    if (materi.filemateri) {
      // Jika ada file foto, hapus file tersebut
      fs.unlinkSync(path.join(__dirname, "../", materi.filemateri));
    }

    res.json({ message: "Materi deleted successfully" }); // Mengembalikan respon sukses
  } catch (error) {
    res.status(500).json({ message: error.message }); // Menangani error
  }
};