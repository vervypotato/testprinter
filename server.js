import { createServer } from 'http'
import { createWriteStream } from 'fs';
import path, { extname, join } from 'path';
import { fileURLToPath } from 'url';
const ipAddress = '172.20.10.2'
const port =  7400


import express from "express";
import cors from "cors";

import fileupload from "express-fileupload";
const app = express();
app.use(fileupload())
app.use(cors({
    "origin" : "*"
}))



app.post("/printer-website", (req, res) => {
    console.log("here")
    let files = req.files;
    if (!files) res.send({"message" : "No files sent"}) 
    let file = files.inpFile;
    // const fileExtName = extname(file.name);
    // console.log(fileExtName)
const fileName =
  Date.now() + '-' + Math.round(Math.random() * 1e9) + ".pdf";
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

const filePath = join(__dirname,'uploads', fileName);
console.log(file)
const writeStream = createWriteStream(filePath, {

});

  writeStream.on('finish', async () => {
    // any thing you want to perform after writing the file
    res.send("file uploaded!")
  });
  writeStream.on('error', (error) => {
    reject(error);
  });
  writeStream.write(file.data);
  writeStream.end()});
  

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
    console.log("server is listening on port " + port);
  });