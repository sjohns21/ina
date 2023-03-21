import { NextApiHandler } from "next";
import * as fs from "fs";
import { openai } from "@/pages/api/openai/index";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false
  }
};

const post: NextApiHandler = async (req, res) => {
  const form = new formidable.IncomingForm();
  return new Promise<void>((resolve, reject) => {
    form.parse(req, async function(err, fields, files) {
      const file = files.file as formidable.File;
      const data = fs.readFileSync(file.filepath);
      const filePath = `audio.wav`;
      fs.writeFileSync(filePath, data);
      await fs.unlinkSync(file.filepath);
      const rs = fs.createReadStream(filePath);
      const response = await openai.createTranscription(
        // @ts-ignore
        rs,
        "whisper-1"
      );
      res.send(response.data.text);
      resolve();
    });
  });
};

const saveFile = async (file: formidable.File) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(file.newFilename, data);
  await fs.unlinkSync(file.filepath);
  return;
};

const handler: NextApiHandler = (req, res) =>
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
      ? console.log("PUT")
      : req.method === "DELETE"
        ? console.log("DELETE")
        : req.method === "GET"
          ? console.log("GET")
          : res.status(404).send("");

const exampleResponse = "Good morning, do you have an appointment? Yes, my name is Jack Smith. Excellent. There you are there. The doctor will be about 10 minutes. Have you been to this practice before? Can you fill in this short form and can I have your Medicare card? Good morning, I'm Dr. Seuss. How are you feeling today? I have been feeling very tired and run down lately. No matter how much I sleep, you get to wake up tired. You don't have the energy for the hobbies you used to enjoy.";

export default handler;
