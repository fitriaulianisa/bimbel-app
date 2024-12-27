const mongoose = require('mongoose');

const MateriSchema = new mongoose.Schema(
  {
    namamateri: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
    },
    kelas: {
      type: String,
      required: true,
    },
    jenisbimbel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JenisBimbel',
      required: true,
    },
    linkurl: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+$/.test(v); // Validasi URL
        },
        message: (props) => `${props.value} bukan URL yang valid!`, // Perbaikan pada penggunaan string template
      },
    },
  },
  { timestamps: true } // Menambahkan createdAt dan updatedAt otomatis
);

module.exports = mongoose.model('Materi', MateriSchema);
