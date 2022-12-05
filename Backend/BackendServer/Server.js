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
app.post("/getFile", async (req, res) => {
  const { Hash } = req.body;
  let ipfs = await client();

  let array = [];
  const fileData = ipfs.cat(Hash);
  console.log("File Data", fileData);
  for await (const itr of fileData) {
    array.push(Buffer.from(itr));
  }
  const newBuffer = Buffer.concat(array);
  // console.log("New Buffer", newBuffer);
  res.status(200).send(newBuffer.toString("base64"));
});

app.post("/addMetaData", async (req, res) => {
  console.log(req.body);
  const { urlHash, Title, Description, Price } = req.body;
  let json = {
    attributes: [
      {
        trait_type: "Digital Asset Price",
        value: Price,
      },
    ],
    description: { Description },
    image: `https://infura-ipfs.io/ipfs/${urlHash}`,
    name: Title,
  };

  const ipfs = await client();
  // const data = fs.readFileSync(json);
  // console.log(data);
  console.log(json);
  const hash = await ipfs.add(Buffer.from(JSON.stringify(json)));

  console.log("Hash", hash);
  res.status(200).send(hash.path);
});
app.post("/addFile", uploadFile.single("file"), async (req, res) => {
  console.log("File", req.file.path);

  const ipfs = await client();

  const data = fs.readFileSync(req.file.path);
  console.log("Orignal Data", data);
  const hash = await ipfs.add(data);

  console.log("Hash", hash);
  res.status(200).send(hash.path);
});
app.listen(4000, () => console.log("App listening on port 4000!"));
