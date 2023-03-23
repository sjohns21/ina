import RecordAudio from "@/components/RecordAudio";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import doctor from "../public/doctor.png";
import { Button, IconButton } from "@mui/material";
import { Send, Settings, List } from "@mui/icons-material";
import Highlight from "@/components/Highlight";

const IndexPage = () => {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [problemsAndCauses, setProblemsAndCauses] = useState<
    [string, string][]
  >([]);
  const [highlightedTranscript, setHighlightedTranscript] = useState<
    React.ReactNode[]
  >([]);
  const getSummary = async () => {
    setSummary(
      (
        await (await fetch("/api/openai/summarize?text=" + transcript)).text()
      ).trim()
    );
  };
  const getHighlights = async () => {
    const prompt = `The following is a dialogue between a doctor and patient:
      ${transcript}
      
      List the patient's problems. 
      For each problem, list the keywords in the dialogue that indicate it, and list potential causes. 
      Format each line like: <problem>; <keywords>; <causes>:`;
    const highlights = await (
      await fetch(encodeURI(`/api/openai/completion?prompt=${prompt}`))
    ).text();
    const keywords = [];
    const problemsAndCauses: [string, string][] = [];
    highlights.split("\n").forEach((line) => {
      const [problem, keyword, causes] = line.split("; ");
      keywords.push(keyword);
      problemsAndCauses.push([problem, causes]);
    });
    setProblemsAndCauses(problemsAndCauses);
  };
  const getHighlightsKeyWords = async (keyPhrases: string[]) => {
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
      <div className="flex flex-col justify-between bg-purple-50 w-1/2 h-full p-2">
        <div>
          {highlightedTranscript.length ? highlightedTranscript : transcript}
        </div>
        <RecordAudio setTranscript={setTranscript} />
      </div>
      <div className="flex flex-col bg-indigo-50 w-1/2 h-full">
        <div className="h-1/2 flex flex-col justify-between p-2">
          <h2 className="text-center">Summary:</h2>
          <div className="whitespace-pre-wrap overflow-auto">{summary}</div>
          <Button onClick={getSummary} variant="outlined">
            Get summary
          </Button>
        </div>
        <div className="h-1/2 flex flex-col justify-between border-t-8 p-2">
          <h2 className="text-center">Highlights:</h2>
          <div className="overflow-auto">
            {problemsAndCauses.map((pc, i) => {
              return (
                <Highlight
                  key={i}
                  label={pc[0]}
                  content={`Potential causes: ${pc[1]}`}
                />
              );
            })}
          </div>
          <Button onClick={getHighlights} variant="outlined">
            Get highlights
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

const exampleTranscript0 =
  "Good morning, do you have an appointment? Yes, my name is Jack Smith. Excellent. " +
  "There you are there. The doctor will be about 10 minutes. Have you been to this practice before? " +
  "Can you fill in this short form and can I have your Medicare card? Good morning, I'm Dr. Seuss. " +
  "How are you feeling today? I have been feeling very tired and run down lately. " +
  "No matter how much I sleep, you get to wake up tired. You don't have the energy for the hobbies you used to enjoy.";

const exampleTranscript1 = `Hi Amy, how are you?
Hi Dr. Katz. I am pretty good. How about you?
Doing well, thank you.  Your test results are back.
Your thyroid hormone levels are quite high. Have you been experiencing any symptoms lately?
Yes, I have. I've been feeling really anxious and have trouble sleeping at night. I've also lost 10 pounds recently without changing my diet.
Okay. Have you noticed any other symptoms?
Well, I've also been feeling a rapid heart beat, even when I'm at rest for a week.
I see. Have you changed your daily exercise?
Not really. I am walking more with a few friends. But that is it.
Ok. Let’s do a quick checkup and see your heart rate.
`;
const exampleTranscriptOneLine =
  "Good morning, do you have an appointment? Yes, my name is Jack Smith. Excellent. There you are there. The doctor will be about 10 minutes. Have you been to this practice before? Can you fill in this short form and can I have your Medicare card? Good morning, I'm Dr. Seuss. How are you feeling today? I have been feeling very tired and run down lately. No matter how much I sleep, you get to wake up tired. You don't have the energy for the hobbies you used to enjoy.";

const exampleSummary =
  "• Jack Smith has an appointment with Dr. Seuss\n" +
  "• Jack Smith has filled out a form and provided his Medicare card\n" +
  "• Jack Smith has been feeling very tired and run down, despite getting enough sleep\n" +
  "• Jack Smith has lost energy for hobbies he used to enjoy";
const exampleKeyPhrases = [
  "Jack Smith",
  "Dr. Seuss",
  "Medicare card",
  "feeling tired",
  "run down",
  "wake up tired",
  "energy",
  "hobbies",
];

const exampleKeyWords =
  "Doctor, Patient, Appointment, Jack Smith, Medicare card, Dr. Seuss, Tired, Run down, Sleep, Energy, Hobbies.";
