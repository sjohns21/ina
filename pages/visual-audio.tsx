import Layout from "@/components/Layout";
import { useRef, useState } from "react";
import YouTube from "react-youtube";

const VisualAudio = () => {
  const [time, setTime] = useState(341);
  const [imageIndex, setImageIndex] = useState(0);
  const image = images[imageIndex];
  if (time === images[imageIndex + 1][0]) setImageIndex(imageIndex + 1);
  const interval = useRef(-1);

  return (
    <Layout title={"Visual Audio"}>
      <div>
        <YouTube
          videoId={"JPX8g8ibKFc"}
          opts={{
            width: 640,
            playerVars: {
              start: 341,
            },
          }}
          onPlay={() => {
            interval.current = window.setInterval(
              () => setTime((prev) => prev + 1),
              1000
            );
          }}
          onPause={() => {
            window.clearInterval(interval.current);
          }}
        />
        <img width={640} src={image[2]} alt={image[1]} />
      </div>
    </Layout>
  );
};
const images: [number, string, string][] = [
  [
    341,
    "hormones",
    "https://askthescientists.com/wp-content/uploads/2018/04/AdobeStock_71056506-2x1-e1527714151363.png",
  ],
  [
    382,
    "cortisol and adrenaline",
    "https://www.coeuscreativegroup.com/wp-content/uploads/2020/08/Brain-stress-response-limbic-neuroscience-anxiety-cortisol-adrenaline-scaled.jpg",
  ],
  [410, "stress and energy", ""],
  [431, "immune system", ""],
  [436, "learning and memory", ""],
  [445, "nootropics", ""],
  [460, "comfort foods", ""],
];

export default VisualAudio;
