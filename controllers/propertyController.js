const Property = require("../models/properties");
const User = require("../models/users");
const { validationResult } = require("express-validator");

const getAllProperties = async (req, res) => {
  const properties = await Property.find();
  res.status(200);
  res.json(properties);
};

const addProperty = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const owner = req.user.id;
  const {
    title,
    description,
    price,
    location,
    images,
    category,
    details,
    capacity,
    availability,
    status,
  } = req.body;

  try {
    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !category ||
      !details ||
      !capacity ||
      !availability ||
      !status
    ) {
      return res.status(400).json({ msg: "Semua data harus diisi" });
    }

    const user = await User.findById(owner);
    if (!user || user.role !== 2) {
      return res
        .status(403)
        .json({ msg: "Anda tidak memiliki izin untuk menambahkan properti" });
    }

    // Buat properti baru
    const newProperty = new Property({
      owner,
      title,
      description,
      price,
      location,
      images,
      category,
      details,
      capacity,
      availability,
      status,
    });

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

const updatePropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      location,
      category,
      details,
      capacity,
      availability,
      status,
    } = req.body;

    // Pastikan data tidak kosong
    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !category ||
      !details ||
      !capacity ||
      !availability ||
      !status
    ) {
      return res.status(400).json({ msg: "Semua data harus diisi" });
    }

    // Temukan dan perbarui properti berdasarkan ID yang diberikan
    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Periksa apakah properti ditemukan
    if (!updatedProperty) {
      return res.status(404).json({ msg: "Properti tidak ditemukan" });
    }

    // Kirim pesan respons yang menyatakan bahwa data berhasil diperbarui
    res
      .status(200)
      .json({ msg: "Properti berhasil diperbarui", updatedProperty });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

const deletePropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Temukan dan hapus properti berdasarkan ID yang diberikan
    const deletedProperty = await Property.findByIdAndDelete(id);

    // Periksa apakah properti ditemukan
    if (!deletedProperty) {
      return res.status(404).json({ msg: "Properti tidak ditemukan" });
    }

    // Kirim pesan respons yang menyatakan bahwa properti berhasil dihapus
    res.status(200).json({ msg: "Properti berhasil dihapus" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

module.exports = {
  getAllProperties,
  addProperty,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
};
