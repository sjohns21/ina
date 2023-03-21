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

const exampleTranscript =
  "Good morning, do you have an appointment? Yes, my name is Jack Smith. Excellent. There you are there. The doctor will be about 10 minutes. Have you been to this practice before? Can you fill in this short form and can I have your Medicare card? Good morning, I'm Dr. Seuss. How are you feeling today? I have been feeling very tired and run down lately. No matter how much I sleep, you get to wake up tired. You don't have the energy for the hobbies you used to enjoy.";
const exampleSummary =
  "Jack Smith visited the doctor's office and filled out a form. The doctor, Dr. Seuss, asked him how he was feeling and Jack reported feeling very tired and run down, no matter how much he slept. He also mentioned he had no energy for the hobbies he used to enjoy.";
