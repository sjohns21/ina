import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import Box from "@mui/material/Box";
import { CircularProgress, IconButton, Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const fetcher = (
  ...args: [input: RequestInfo | URL, init?: RequestInit | undefined]
) => fetch(...args).then((res) => res.json());
export const Chat = ({ prompt }: { prompt: string }) => {
  const [thread, setThread] = useState(prompt);
  const [addition, setAddition] = useState("");
  const [loading, setLoading] = useState(false);
  const rows = useMemo(() => thread.split("\n").slice(2), [thread]);

  const send = async () => {
    let prompt = thread + addition + "\nAI:";
    setThread(prompt);
    setAddition("");
    setLoading(true);
    let response = await fetcher(
      `/api/chat?prompt=${encodeURIComponent(prompt)}`
    );
    setThread(prompt + response + "\nHuman: ");
    setLoading(false);
  };
  return (
    <Layout title="Chat Plus">
      {rows.map((row, i) => (
        <div key={i} style={{ background: i % 2 == 0 ? "white" : "lightgray" }}>
          {row}
        </div>
      ))}
      <Box sx={{ display: "flex" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Input
              value={addition}
              onChange={(e) => setAddition(e.target.value)}
              fullWidth
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <IconButton aria-label="send" onClick={send}>
              <SendIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Layout>
  );
};
