import Layout from "../components/Layout";
import { useState } from "react";
import { IconButton, Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const fetcher = (
  ...args: [input: RequestInfo | URL, init?: RequestInit | undefined]
) => fetch(...args).then((res) => res.json());

const IndexPage = () => {
  const [thread, setThread] = useState(initialThread);
  const [addition, setAddition] = useState("");
  return (
    <Layout title="Chat Plus">
      <textarea
        value={thread}
        readOnly
        style={{ width: "100%", height: 200 }}
      />
      <div style={{ display: "flex" }}>
        <Input
          value={addition}
          onChange={(e) => setAddition(e.target.value)}
          fullWidth
        />
        <IconButton
          aria-label="delete"
          onClick={async () => {
            let prompt = thread + addition + "\nAI:";
            let response = await fetcher(`/api/chat?prompt=${prompt}`);
            setThread(prompt + response + "\nHuman: ");
            setAddition("");
          }}
        >
          <SendIcon />
        </IconButton>
      </div>
    </Layout>
  );
};

const initialThread = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

Human: Hello, who are you?
AI: I am an AI created by OpenAI. How can I help you today?
Human: `;
export default IndexPage;
