const { Router } = require("express");

const router = Router();

router.get("/test", (req, res) => res.json({ proyectos: "Está bien desde proyectos" }));
router.post("/nuevo", require("../../controllers/nuevoProducto"));
router.get("/", require("../../controllers/todoProducto"));
router.get("/:productoID", require("../../controllers/productoPorId"));
router.delete("/:productoID", require("../../controllers/deleteProducto"));
router.put("/:productoID", require("../../controllers/editarProducto"));

module.exports = router;
