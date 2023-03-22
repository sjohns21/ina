import { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/pages/api/openai/index";
//february implementation
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.query.prompt,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: req.query.stop,
  });
  res.status(200).json(response.data.choices[0].text);
};

export default handler;
