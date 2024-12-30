// const Materi = require("../models/materi");
// const JenisBimbel = require("../models/jenisBimbel");
// // const cloudinary = require("cloudinary").v2;

// const path = require("path");
// const fs = require("fs");
// // Fungsi untuk menambahkan materi baru
// exports.createMateri = async (req, res) => {
//   const { namamateri, deskripsi, kelas, jenisbimbel_id } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ message: "File materi is required" });
//   }

//   try {
//     const jenisbimbel = await JenisBimbel.findById(jenisbimbel_id);
//     if (!jenisbimbel) {
//       return res.status(404).json({ message: "Jenis Bimbel not found" });
//     }

//     // const fileUpload = await cloudinary.uploader.upload(req.file.path, {
//     //   folder: "materi_bimbel",
//     // });

//     const materi = new Materi({
//       namamateri,
//       deskripsi,
//       kelas,
//       jenisbimbel_id,
//       filemateri: req.file ? req.file.path : null,
//       // filemateri: fileUpload.secure_url,
//     });

//     await materi.save();
//     res.status(201).json({ message: "Materi created successfully", materi });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Fungsi untuk mendapatkan semua materi
// exports.getAllMateri = async (req, res) => {
//   try {
//     const materi = await Materi.find().populate("jenisbimbel_id", "nama");
//     res.json(materi);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Fungsi untuk mendapatkan materi berdasarkan ID
// exports.getMateriById = async (req, res) => {
//   try {
//     const materi = await Materi.findById(req.params.id).populate(
//       "jenisbimbel_id",
//       "nama"
//     );
//     if (!materi) {
//       return res.status(404).json({ message: "Materi not found" });
//     }
//     res.json(materi);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Fungsi untuk memperbarui materi
// exports.updateMateri = async (req, res) => {
//   const { namamateri, deskripsi, kelas, jenisbimbel_id } = req.body;

//   try {
//     const materi = await Materi.findById(req.params.id);
//     if (!materi) {
//       return res.status(404).json({ message: "Materi not found" });
//     }

//     if (req.file) {
//       // jika ada file baru
//       if (materi.file) {
//         // hapus file lama jika ada
//         fs.unlinkSync(path.join(__dirname, "../", materi.foto));
//       }
//       materi.foto = req.file.path; // Simpan path file baru
//     }
//     // if (req.file) {
//     //   const fileUpload = await cloudinary.uploader.upload(req.file.path, {
//     //     folder: "materi_bimbel",
//     //   });
//     //   materi.filemateri = fileUpload.secure_url;
//     // }

//     materi.namamateri = namamateri ?? materi.namamateri;
//     materi.deskripsi = deskripsi ?? materi.deskripsi;
//     materi.kelas = kelas ?? materi.kelas;
//     materi.jenisbimbel_id = jenisbimbel_id ?? materi.jenisbimbel_id;

//     await materi.save();
//     res.json({ message: "Materi updated successfully", materi });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Fungsi untuk menghapus materi
// exports.deleteMateri = async (req, res) => {
//   try {
//     const materi = await Materi.findByIdAndDelete(req.params.id);
//     if (!materi) {
//       return res.status(404).json({ message: "Materi not found" });
//     }

//     if (materi.filemateri) {
//       // Jika ada file foto, hapus file tersebut
//       fs.unlinkSync(path.join(__dirname, "../", materi.filemateri));
//     }
//     // if (materi.filemateri) {
//     //   const filePublicId = materi.filemateri.split("/").pop().split(".")[0];
//     //   await cloudinary.uploader.destroy(filePublicId);
//     // }

//     res.json({ message: "Materi deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Materi = require("../models/materi");
const JenisBimbel = require("../models/jenisBimbel");
const cloudinary = require("../config/cloudinary"); // Pastikan ini adalah path yang benar
const path = require("path");
const fs = require("fs");

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

    // Unggah ke Cloudinary
    const fileUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "materi_bimbel",
    });

    const materi = new Materi({
      namamateri,
      deskripsi,
      kelas,
      jenisbimbel_id,
      filemateri: fileUpload.secure_url, // Simpan URL dari Cloudinary
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
    const materi = await Materi.findById(req.params.id).populate("jenisbimbel_id", "nama");
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
      // jika ada file baru
      // Hapus file lama dari Cloudinary
      const filePublicId = materi.filemateri.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(filePublicId);

      // Unggah file baru ke Cloudinary
      const fileUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "materi_bimbel",
      });
      materi.filemateri = fileUpload.secure_url; // Simpan URL file baru
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

    // Hapus file dari Cloudinary
    const filePublicId = materi.filemateri.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(filePublicId);

    res.json({ message: "Materi deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};