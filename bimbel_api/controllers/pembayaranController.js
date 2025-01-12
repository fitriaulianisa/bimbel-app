const Pembayaran = require("../models/pembayaran");
// const getAllPembayaran = async (req, res) => {
//     try {
//         //const murid = await Murid.find();
        
//         const pembayaran = await Pembayaran.find(); 
//         res.status(200).json(pembayaran);
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// };
const getAllPembayaran = async (req, res) => {
    try {
        // Jika pengguna adalah admin, ambil semua pembayaran
        if (req.user.role === 'admin') {
            const pembayaran = await Pembayaran.find(); 
            return res.status(200).json(pembayaran);
        }

        // Jika pengguna adalah user, ambil pembayaran berdasarkan userId
        const pembayaran = await Pembayaran.find({ userId: req.user.userId });
        res.status(200).json(pembayaran);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
// const getPembayaranById = async (req, res) => {
//     try {
//         const pembayaran = await Pembayaran.findById(req.params.id);
//         if (!pembayaran)
//             return res.status(404).json({message: "Pembayaran not found"});

//         res.status(200).json(pembayaran);
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// };
const getPembayaranById = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findById(req.params.id);
        if (!pembayaran) {
            return res.status(404).json({message: "Pembayaran not found"});
        }

        // Cek apakah pengguna adalah admin atau pemilik pembayaran
        if (req.user.role !== 'admin' && pembayaran.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.status(200).json(pembayaran);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};


// const createPembayaran = async (req, res) => {
//     const pembayaran = new Pembayaran({
//         namaMurid: req.body.namaMurid,
//         tgl_pembayaran: req.body.tgl_pembayaran,
//         pembayaran_bln: req.body.pembayaran_bln,
//         jml_transaksi: req.body.jml_transaksi,
//         no_rek: req.body.no_rek,
//         validasi: req.body.validasi,
//     })
//     try {
//         const newPembayaran = await pembayaran.save();

//         res.status(200).json(newPembayaran);
//     } catch (err) {
//         res.status(400).json({message: err.message});
//     }
// };
const createPembayaran = async (req, res) => {
    const pembayaran = new Pembayaran({
        userId: req.user.userId, // Tambahkan userId
        namaMurid: req.body.namaMurid,
        tgl_pembayaran: req.body.tgl_pembayaran,
        pembayaran_bln: req.body.pembayaran_bln,
        jml_transaksi: req.body.jml_transaksi,
        no_rek: req.body.no_rek,
        validasi: req.body.validasi,
    });

    try {
        const newPembayaran = await pembayaran.save();
        res.status(201).json(newPembayaran);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

// const updatePembayaran = async (req, res) => {
//     try {
//         const pembayaran = await Pembayaran.findById(req.params.id);

//         if (!pembayaran)
//             return res.status(404).json({ message: "Pembayaran not found" });
        
//         if (req.body.namaMurid != null){
//             pembayaran.namaMurid = req.body.namaMurid;
//         }
//         if (req.body.tgl_pembayaran != null){
//             pembayaran.tgl_pembayaran = req.body.tgl_pembayaran;
//         }
//         if (req.body.pembayaran_bln != null){
//             pembayaran.pembayaran_bln = req.body.pembayaran_bln;
//         }
//         if (req.body.jml_transaksi != null){
//             pembayaran.jml_transaksi = req.body.jml_transaksi;
//         }
//         if (req.body.no_rek != null){
//             pembayaran.no_rek = req.body.no_rek;
//         }
//         if (req.body.validasi != null){
//             pembayaran.validasi = req.body.validasi;
//         }

//         const updatePembayaran = await pembayaran.save();

//         res.status(200).json(updatePembayaran);
//     } catch (err) {
//         res.status(400).json({message: err.message});
//     }
// };

const updatePembayaran = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findById(req.params.id);

        if (!pembayaran) {
            return res.status(404).json({ message: "Pembayaran not found" });
        }

        // Cek apakah pengguna adalah admin atau pemilik pembayaran
        if (req.user.role !== 'admin' && pembayaran.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        // Update fields
        if (req.body.namaMurid != null) {
            pembayaran.namaMurid = req.body.namaMurid;
        }
        if (req.body.tgl_pembayaran != null) {
            pembayaran.tgl_pembayaran = req.body.tgl_pembayaran;
        }
        if (req.body.pembayaran_bln != null) {
            pembayaran.pembayaran_bln = req.body.pembayaran_bln;
        }
        if (req.body.jml_transaksi != null) {
            pembayaran.jml_transaksi = req.body.jml_transaksi;
        }
        if (req.body.no_rek != null) {
            pembayaran.no_rek = req.body.no_rek;
        }
        if (req.body.validasi != null) {
            pembayaran.validasi = req.body.validasi;
        }

        const updatePembayaran = await pembayaran.save();
        res.status(200).json(updatePembayaran);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};
const deletePembayaran = async (req, res) => {
    try {
        // Pastikan pengguna memiliki role admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Hanya Admin" });
        }
        const pembayaran = await Pembayaran.findById(req.params.id);

        if (!pembayaran)
            return res.status(404).json({ message: "Pembayaran not found" });

        await pembayaran.deleteOne();
        res.status(200).json({message: "Pembayaran deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
module.exports = {
    getAllPembayaran,
    createPembayaran,
    getPembayaranById,
    updatePembayaran,
    deletePembayaran
};