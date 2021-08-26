const { ProductoModel } = require("../models/producto");

const editarProducto = async (req, res) => {
  try {
    const { productoID } = req.params;
    const { Titulo, Precio, Descripcion } = req.body;

    const doc = await ProductoModel.findByIdAndUpdate(productoID, {
        Titulo, 
        Precio, 
        Descripcion
    });

    if (!doc) return res.status(404).json({ message: "No se púdo editar" });

    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = editarProducto;