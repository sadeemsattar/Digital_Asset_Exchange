const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
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

const client = async () => {
  const auth =
    "Basic " +
    Buffer.from(
      process.env.PROJECT_ID + ":" + process.env.PROJECT_SCERET
    ).toString("base64");
  const { create } = await import("ipfs-http-client");
  const ipfs = await create({
    host: "infura-ipfs.io:5001",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  return ipfs;
};
app.get("/getFile", async (req, res) => {});
app.post("/addFile", uploadFile.single("file"), async (req, res) => {
  console.log("File", req.file.path);
  const ipfs = await client();
  const data = fs.readFileSync(req.file.path);
  const hash = await ipfs.add(data);
  console.log("Hash", hash);
  res.status(200).send(hash);
});
app.listen(4000, () => console.log("App listening on port 4000!"));
