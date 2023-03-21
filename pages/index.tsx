import RecordAudio from "@/components/RecordAudio";
import { useState } from "react";
import React from "react";

const IndexPage = () => {
  const [transcript, setTranscript] = useState("");
  return <div className={"flex h-full"}>
    <div className="flex flex-col bg-indigo-200 w-2/12 h-full">
    <div className="">left</div>
    </div>

    <div className="flex flex-col bg-amber-50 w-1/2 h-full">
    <div>center
      <br />
      {transcript}
    </div>
    <RecordAudio setTranscript={setTranscript} />
    </div>
    <div className="flex flex-col bg-sky-100 w-2/2 h-full">
    <div>right</div>
    </div>
    
  </div>;
};

export default IndexPage;
