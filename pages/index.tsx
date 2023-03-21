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
  const [highlightedTranscript, setHighlightedTranscript] = useState<
    React.ReactNode[]
  >([]);
  const getSummary = async () => {
    setSummary(
      await (await fetch("/api/openai/summarize?text=" + transcript)).text()
    );
  };

  const getHighlights = async () => {
    const keyPhrases = (
      await (await fetch("/api/openai/keywords?text=" + transcript)).text()
    ).split(", ");

    const regExp = new RegExp(keyPhrases.join("|"), "gi");
    let match;
    const matches = [];
    while ((match = regExp.exec(transcript)) !== null) {
      const start = match.index;
      const end = regExp.lastIndex;
      const phrase = match[0];
      matches.push({ start, end, phrase });
    }
    const makeSpan = (s: string, si: number) => (
      <span key={si} className="bg-yellow-200">
        {s}
      </span>
    );
    let out: React.ReactNode[] = [];
    if (matches[0]) {
      out.push(transcript.substring(0, matches[0].start));
      for (let mi = 0; mi < matches.length - 1; mi++) {
        const match = matches[mi];
        out.push(makeSpan(match.phrase, match.start));
        out.push(transcript.substring(match.end, matches[mi + 1].start));
      }
      const lastMatch = matches[matches.length - 1];
      out.push(makeSpan(lastMatch.phrase, lastMatch.start));
      out.push(transcript.substring(lastMatch.end));
    }
    setHighlightedTranscript(out);
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
        <div>
          {highlightedTranscript.length ? highlightedTranscript : transcript}
        </div>
        <RecordAudio setTranscript={setTranscript} />
        <button onClick={getSummary}>Get summary</button>
      </div>
      <div className="flex flex-col bg-indigo-50 w-1/2 h-full">
        <div className="h-1/2">
          <h2>Summary:</h2>
          <div className="whitespace-pre-wrap">{summary}</div>
        </div>
        <div className="h-1/2">
          <h2>Highlights:</h2>
          {/*<div>{highlights}</div>*/}
          <button onClick={getHighlights}>get highlights</button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

const exampleTranscript =
  "Good morning, do you have an appointment? Yes, my name is Jack Smith. Excellent. " +
  "There you are there. The doctor will be about 10 minutes. Have you been to this practice before? " +
  "Can you fill in this short form and can I have your Medicare card? Good morning, I'm Dr. Seuss. " +
  "How are you feeling today? I have been feeling very tired and run down lately. " +
  "No matter how much I sleep, you get to wake up tired. You don't have the energy for the hobbies you used to enjoy.";
const exampleSummary =
  "• Jack Smith has an appointment with Dr. Seuss\n" +
  "• Jack Smith has filled out a form and provided his Medicare card\n" +
  "• Jack Smith has been feeling very tired and run down, despite getting enough sleep\n" +
  "• Jack Smith has lost energy for hobbies he used to enjoy";

const exampleKeyWords =
  "Doctor, Patient, Appointment, Jack Smith, Medicare card, Dr. Seuss, Tired, Run down, Sleep, Energy, Hobbies.";
