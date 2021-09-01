const { ProductoModel } = require("../models/producto");

const nuevoProducto = async (req, res) => {
  try {
    const {Titulo, Precio, Descripcion, colores} = req.body;

    const existiente = await ProductoModel.findOne({Titulo});

    if (existiente) throw new Error("Este producto ya existe");

    const doc = await ProductoModel.create({
      Titulo, 
      Precio, 
      Descripcion,
      colores: colores.filter(Boolean)
    });

    

    res.status(201).json(doc);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = nuevoProducto;