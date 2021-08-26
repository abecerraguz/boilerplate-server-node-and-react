const { Router } = require("express");

const router = Router();

// router.get("/test", (req, res) => res.json({ test: "Esta bien desde Backend de APIIIIII" }));
// router.use("/", (req, res) => res.json({ message: "Esta bien desde Backend de APIIIIIIII" }));
router.use("/producto", require("./producto"));

module.exports = router;