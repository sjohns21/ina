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
      <div className="flex flex-col bg-indigo-200 w-2/12 h-full items-center">
        <Image src={doctor} alt={"doctor"} width={120} />
        <div className="flex flex-col">
          <IconButton aria-label="send">
            <Send />
          </IconButton>
          <IconButton aria-label="send">
            <List />
          </IconButton>
          <IconButton aria-label="send">
            <Settings />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col bg-purple-50 w-1/2 h-full">
        <div>
          center
          <br />
          {transcript}
        </div>
        <RecordAudio setTranscript={setTranscript} />
        <button onClick={getSummary}>Get summary</button>
      </div>
      <div className="flex flex-col bg-indigo-50 w-1/2 h-full">
        <div>
          right
          <div>{summary}</div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
