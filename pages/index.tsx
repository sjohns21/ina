import RecordAudio from "@/components/RecordAudio";
import { useState } from "react";

const IndexPage = () => {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const getSummary = async () => {
    setSummary(await (await fetch("/api/openai/summarize?text=" + transcript)).text());
  };
  return <div className={"flex h-full"}>
    <div style={{ background: "#E7E9FF" }}>left</div>
    <div>center
      <br />
      {transcript}
    </div>
    <div>right
      <div>{summary}</div>
    </div>
    <RecordAudio setTranscript={setTranscript} />
    <button onClick={getSummary}>Get summary</button>
  </div>;
};

export default IndexPage;
