const express = require('express');
const router = express.Router();

// Contoh endpoint
router.get('/materi', (req, res) => {
    res.json({ message: 'Daftar materi bimbel' });
});

router.post('/tambah-materi', (req, res) => {
    const { judul, deskripsi } = req.body;
    res.json({ message: `Materi ${judul} berhasil ditambahkan` });
});

module.exports = router;
