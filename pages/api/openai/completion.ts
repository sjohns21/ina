import { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/pages/api/openai/index";
import { CreateCompletionRequest } from "openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const obj = { ...defaultObj, ...req.query };
  obj.temperature = Number(obj.temperature);
  const response = await openai.createCompletion(obj);
  res.send(String(response.data.choices[0].text).trim());
};
const defaultObj: CreateCompletionRequest = {
  model: "text-davinci-003",
  prompt: "",
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};
export default handler;
