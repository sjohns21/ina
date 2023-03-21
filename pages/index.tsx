import RecordAudio from "@/components/RecordAudio";
import { useState } from "react";

const IndexPage = () => {
  const [transcript, setTranscript] = useState("");
  return <div className={"flex h-full"}>
    <div style={{ background: "#E7E9FF" }}>left</div>
    <div>center
      <br />
      {transcript}
    </div>
    <div>right</div>
    <RecordAudio setTranscript={setTranscript} />
  </div>;
};

export default IndexPage;
