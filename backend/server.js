const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log("MongoDB connected"))
 .catch((err) => console.log(err));

 app.get("/", (req, res) => {
    res.send("API running");
 })

 const formRoutes = require("./routes/formRoutes");
 app.use("/api/forms", formRoutes);

 const responseRoutes = require("./routes/responseRoutes");
 app.use("/api/responses", responseRoutes);

 app.listen(5000, () => {
    console.log("Sever running on port 5000");
 })