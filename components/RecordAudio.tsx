import { useState, useEffect, useRef } from "react";

const RecordAudio = () => {
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
      <button onClick={startRecording} disabled={recording}>
        Start recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop recording
      </button>
      {audioURL && (
        <audio controls src={audioURL}>
          Your browser does not support the audio element.
        </audio>
      )}
      {audioBlob && <button onClick={() => {
        const formData = new FormData();
        formData.append("file", audioBlob);
        fetch("/api/openai/transcribe", {
          method: "POST",
          body: formData
        });
      }
      }>send
      </button>}
    </>
  );
};

export default RecordAudio;
