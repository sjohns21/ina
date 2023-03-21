import { NextApiHandler } from "next";
import * as fs from "fs";
import { openai } from "@/pages/api/openai";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false
  }
};

const post: NextApiHandler = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function(err, fields, files) {
    const file = files.file as formidable.File;
    const data = fs.readFileSync(file.filepath);
    const filePath = `./public/audio.wav`;
    fs.writeFileSync(filePath, data);
    await fs.unlinkSync(file.filepath);
    const rs = fs.createReadStream(filePath);
    const response = await openai.createTranscription(
      // @ts-ignore
      rs,
      "whisper-1"
    );
    res.send(response.data.text);
  });
};

const saveFile = async (file: formidable.File) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.newFilename}`, data);
  await fs.unlinkSync(file.filepath);
  return;
};

const handler: NextApiHandler = (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
      ? console.log("PUT")
      : req.method === "DELETE"
        ? console.log("DELETE")
        : req.method === "GET"
          ? console.log("GET")
          : res.status(404).send("");
};


export default handler;
