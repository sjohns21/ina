import RecordAudio from "@/components/RecordAudio";
import { useState } from "react";

const IndexPage = () => {
  const [transcript, setTranscript] = useState("");
  return <div>
    <RecordAudio setTranscript={setTranscript} />
    {transcript}
  </div>;
};

export default IndexPage;
