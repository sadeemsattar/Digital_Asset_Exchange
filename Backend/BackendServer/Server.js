const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const multer = require("multer");
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
const uploadFile = multer({ dest: "public/" });
app.get("/getFile", (req, res) => {});
app.post("/addFile", uploadFile.single("file"), (req, res) => {
  console.log("Formdata", req.body);
  res.send("message");
});
app.listen(4000, () => console.log("App listening on port 4000!"));
