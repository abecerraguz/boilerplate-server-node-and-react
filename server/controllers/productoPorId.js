const { ProductoModel } = require("../models/producto");

const productoPorId = async (req, res) => {
  try {
    // console.log('productoID-->',req)
    const { productoID } = req.params;

    const doc = await ProductoModel.findById(productoID);

    if (!doc) return res.status(404).json({ message: "No se pudo encontrar" });

    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = productoPorId;