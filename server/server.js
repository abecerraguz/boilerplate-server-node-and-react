require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;

require("./config/connectToDB")();

const app = express();

app.use(express.json());

app.use("/api", require("./routes/api"));

app.listen(PORT, () => console.log(`1/2 El servidor está en PORT: ${PORT}`));