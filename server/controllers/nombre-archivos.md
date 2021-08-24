# Nombre de archivos según su funcionalidad

## Nombres

### todoProducto.js
```javascript
const { ProductoModel } = require("../../models/va-a-models");

const nuevoProducto = async (req, res) => {
  try {
    const productos = await ProductoModel.find();
    res.json(productos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = nuevoProducto;
```

### productoPorId.js
```javascript
const { ProductoModel } = require("../../models/va-a-models");

const nuevoProducto = async (req, res) => {
  try {
    const { productoID } = req.params;

    const doc = await ProductoModel.findById(productoID);

    if (!doc) return res.status(404).json({ message: "No se pudo encontrar" });

    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = nuevoProducto;
```

### deleteProducto.js
```javascript
const { ProductoModel } = require("../../models/va-a-models");

const deleteProducto = async (req, res) => {
  try {
    const { productoID } = req.params;

    const doc = await ProductoModel.findByIdAndDelete(productoID);

    if (!doc) return res.status(404).json({ message: "No se pudó encontrar" });

    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = deleteProducto;
```

### nuevoProducto.js

```javascript
const { ProductoModel } = require("../../models/Mascota");

const nuevoProducto = async (req, res) => {
  try {
    const { Nombre, Tipo, Description, Habilidad} = req.body;

    const existiente = await ProductoModel.findOne({ Nombre });

    if (existiente) throw new Error("Este producto ya existe");

    const doc = await ProductoModel.create({ Nombre, Tipo, Description, Habilidad});

    res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = nuevoProducto;

```