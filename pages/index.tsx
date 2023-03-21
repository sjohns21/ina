import RecordAudio from "@/components/RecordAudio";
import { useState } from "react";
import React from "react";

const IndexPage = () => {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const getSummary = async () => {
    setSummary(await (await fetch("/api/openai/summarize?text=" + transcript)).text());
  };
  return <div className="flex h-full">
    <div className="flex flex-col bg-indigo-200 w-2/12 h-full">
    <div className="">left</div>
    </div>

    <div className="flex flex-col bg-purple-50 w-1/2 h-full">
    <div>center
      <br />
      {transcript}
    </div>
    <RecordAudio setTranscript={setTranscript} />
      <button onClick={getSummary}>Get summary</button>
    </div>
    <div className="flex flex-col bg-indigo-50 w-1/2 h-full">
    <div>right
      <div>{summary}</div>
    </div>
    </div>

  </div>;
};

export default IndexPage;
