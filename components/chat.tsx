import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Input } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ChatCompletionRequestMessage } from "openai";

const fetcher = (
  ...args: [input: RequestInfo | URL, init?: RequestInit | undefined]
) => fetch(...args).then((res) => res.json());

export const Chat = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([{ role: "user", content: "" }]);
  const [addition, setAddition] = useState("");
  const [loading, setLoading] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!threadRef.current) return;
    // Scroll to the bottom of the thread when new messages are added
    threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages]);
  useEffect(() => {
    send();
  }, []);
  const send = async () => {
    let next = [...messages, { role: 'user' as const, content: addition }]
    setMessages(next);
    setAddition("");
    setLoading(true);
    let response = await fetcher(
      `/api/openai/chat?messages=${next}`
    );
    next = [...messages, { role: 'assistant' as const, content: response }]
    setMessages(next);
    setLoading(false);
  };
  return (
    <div className={"flex flex-col overflow-auto"} style={{ height: "80vh" }}>
      <div className={"overflow-auto"} ref={threadRef}>
        {messages.map((row, i) => (
          <div
            key={i}
            style={{ background: i % 2 == 0 ? "white" : "lightgray" }}
          >
            {row.role}: {row.content}
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
        <LoadingButton onClick={send} loading={loading} variant="contained">
          <span>Submit</span>
        </LoadingButton>
      </Box>
    </div>
  );
};
