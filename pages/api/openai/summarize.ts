import { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/pages/api/openai/index";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Convert my short hand into a first-hand account of the meeting:\n\n${req.query.text}`,
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  res.send(response.data.choices[0].text);
};

export default handler;
