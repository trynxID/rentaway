const Property = require("../models/properties");
const User = require("../models/users");
const { validationResult } = require("express-validator");

const getAllProperties = async (req, res) => {
  const properties = await Property.find();
  res.status(200);
  res.json(properties);
};

const addProperty = async (req, res) => {
  // Validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure data properti dari req.body
  const {
    title,
    description,
    price,
    location,
    category,
    details,
    capacity,
    availability,
    status
  } = req.body;

  try {
    // Pastikan data tidak kosong
    if (!title || !description || !price || !location || !category || !details || !capacity || !availability || !status) {
      return res.status(400).json({ msg: "Semua data harus diisi" });
    }

      // Pastikan userId tersedia di req.body
      if (!req.body.userId) {
        return res.status(400).json({ msg: "ID pengguna (userId) diperlukan" });
      }
  
      // Temukan pengguna dengan ID yang diberikan
      const user = await User.findById(req.body.userId);
  
      // Pastikan pengguna dengan ID yang diberikan memiliki peran sebagai pemilik (role 2)
      if (!user || user.role !== 2) {
        return res.status(403).json({ msg: "Anda tidak memiliki izin untuk menambahkan properti" });
      }

    // Buat properti baru
    const newProperty = new Property({
      owner: req.body.userId, // Gunakan userId yang disertakan dalam req.body
      title,
      description,
      price,
      location,
      category,
      details,
      capacity,
      availability,
      status,
    });

    // Simpan properti baru ke database
    await newProperty.save();

    res.status(201).json({ msg: "Properti berhasil ditambahkan" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

const getPropertyById = async (req, res) => {
  try {
    // Ambil ID properti dari parameter permintaan
    const { id } = req.params;

    // Temukan properti berdasarkan ID yang diberikan
    const property = await Property.findById(id);

    // Periksa apakah properti ditemukan
    if (!property) {
      return res.status(404).json({ msg: "Properti tidak ditemukan" });
    }

    // Kirim detail properti sebagai respons
    res.status(200).json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};


module.exports = {
  getAllProperties, addProperty, getPropertyById
};
