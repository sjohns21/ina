import RecordAudio from "@/components/RecordAudio";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import doctor from "../public/doctor.png";
import { IconButton } from "@mui/material";
import { Send, Settings, List } from "@mui/icons-material";

const IndexPage = () => {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const getSummary = async () => {
    setSummary(
      await (await fetch("/api/openai/summarize?text=" + transcript)).text()
    );
  };
  return (
    <div className="flex h-full">
      <div className="flex flex-col bg-indigo-200 w-2/12 h-full items-center justify-between">
        <Image src={doctor} alt={"doctor"} width={120} />
        <div className="flex flex-col">
          <IconButton aria-label="send">
            <Send />
          </IconButton>
          <IconButton aria-label="list">
            <List />
          </IconButton>
          <IconButton aria-label="settings">
            <Settings />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col bg-purple-50 w-1/2 h-full">
        <div>{transcript}</div>
        <RecordAudio setTranscript={setTranscript} />
        <button onClick={getSummary}>Get summary</button>
      </div>
      <div className="flex flex-col bg-indigo-50 w-1/2 h-full">
        <div className="h-1/2">
          <h2>Summary:</h2>
          <div>{summary}</div>
        </div>
        <div className="h-1/2">
          <h2>Highlights:</h2>
          {/*<div>{highlights}</div>*/}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
