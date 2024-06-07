const Property = require("../models/properties");
const { validationResult } = require("express-validator");

const getAllProperties = async (req, res) => {
  const properties = await Property.find();
  res.status(200).json(properties);
};

const addProperty = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    description,
    price,
    location,
    occupant,
    details,
    stocks,
  } = req.body;

  try {
    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !stocks ||
      !details ||
      !occupant
    ) {
      return res.status(400).json({ msg: "Semua data harus diisi" });
    }
        
    const images = req.files.map(file => `/uploads/property/images/${file.filename}`);

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      images,
      occupant,
      details,
      stocks,
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
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ msg: "Properti tidak ditemukan" });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

const updatePropertyById = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    location,
    occupant,
    details,
    stocks,
    status,
  } = req.body;

  if (
    !title ||
    !description ||
    !price ||
    !location ||
    !stocks ||
    !details ||
    !occupant ||
    !status
  ) {
    return res.status(400).json({ msg: "Semua data harus diisi" });
  }

  try {    
    const images = req.files.map(file => `/uploads/property/images/${file.filename}`);

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        location,
        images,
        occupant,
        details,
        stocks,
        status,
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ msg: "Properti tidak ditemukan" });
    }

    res.status(200).json({ msg: "Properti berhasil diperbarui", updatedProperty });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

const deletePropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ msg: "Properti tidak ditemukan" });
    }
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