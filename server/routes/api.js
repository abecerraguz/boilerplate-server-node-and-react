const { Router } = require("express");

const router = Router();

router.get("/test", (req, res) => res.json({ test: "Esta bien desde Backend de API" }));
router.use("/", (req, res) => res.json({ message: "end-to-end funciona" }));
router.use("/mascota", require("./proyecto"));

module.exports = router;