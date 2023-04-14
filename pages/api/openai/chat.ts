import { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/pages/api/openai/index";
import { ChatCompletionRequestMessage } from "openai";

type Body = {
  body: {
    messages: ChatCompletionRequestMessage[];
  };
};
const handler = async (req: NextApiRequest & Body, res: NextApiResponse) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: req.body.messages,
  });
  res.status(200).json(response.data.choices[0].message);
};

export default handler;
