import { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/pages/api/openai/index";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `The following is a dialogue between a doctor and patient. Convert it into a summary:\n\n${req.query.text}`,
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  res.send(response.data.choices[0].text);
};

export default handler;
