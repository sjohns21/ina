import { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";

const RecordAudio = ({ setTranscript }: { setTranscript: Dispatch<SetStateAction<string>> }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const constraints = { audio: true };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        setAudioURL(URL.createObjectURL(audioBlob));
        audioChunksRef.current = [];
      });
    });
  }, []);

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <>
      <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={startRecording} disabled={recording}>
        Start recording
      </button>
      <button className="text-white bg-gray-500 hover:bg-gray-600 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={stopRecording} disabled={!recording}>
        Stop recording
      </button>
      {audioURL && (
        <audio controls src={audioURL}>
          Your browser does not support the audio element.
        </audio>
      )}
      {audioBlob && <button onClick={async () => {
        const formData = new FormData();
        formData.append("file", audioBlob);
        const r = await (await fetch("/api/openai/transcribe", {
          method: "POST",
          body: formData
        })).text();
        setTranscript(r);
      }
      }>send
      </button>}
    </>
  );
};

export default RecordAudio;
