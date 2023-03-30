import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import Box from "@mui/material/Box";
import { CircularProgress, IconButton, Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const fetcher = (
  ...args: [input: RequestInfo | URL, init?: RequestInit | undefined]
) => fetch(...args).then((res) => res.json());
export const Chat02 = ({
  prompt,
  AILabel,
}: {
  prompt: string;
  AILabel: string;
}) => {
  const [thread, setThread] = useState(prompt);
  const [addition, setAddition] = useState("");
  const [loading, setLoading] = useState(false);
  const rows = useMemo(() => thread.split("\n").slice(2), [thread]);
  useEffect(() => {
    send();
  }, []);
  const send = async () => {
    let prompt = thread + addition + `\n${AILabel}:`;
    setThread(prompt);
    setAddition("");
    setLoading(true);
    let response = await fetcher(
      `/api/openai/chat-02?prompt=${encodeURIComponent(prompt)}&stop=${[
        `${AILabel}: `,
        "You: ",
      ]}`
    );
    setThread(prompt + response + "\nYou: ");
    setLoading(false);
  };
  return (
    <div className={"flex flex-col"}>
      <div>
        {rows.map((row, i) => (
          <div
            key={i}
            style={{ background: i % 2 == 0 ? "white" : "lightgray" }}
          >
            {row}
          </div>
        ))}
      </div>
      <Box sx={{ display: "flex" }}>
        <Input
          value={addition}
          onChange={(e) => setAddition(e.target.value)}
          fullWidth
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <IconButton aria-label="send" onClick={send}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </div>
  );
};
