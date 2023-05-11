import Layout from "@/components/Layout";
import { useRef, useState } from "react";
import YouTube from "react-youtube";

const VisualAudio = () => {
  const initialTime = 341;
  const [time, setTime] = useState(initialTime);
  const [imageIndex, setImageIndex] = useState(0);
  const image = images[imageIndex];
  if (images[imageIndex + 1] && time === images[imageIndex + 1][0])
    setImageIndex(imageIndex + 1);
  const interval = useRef(-1);

  return (
    <Layout title={"Visual Audio"}>
      <div>
        <YouTube
          videoId={"JPX8g8ibKFc"}
          opts={{
            width: 640,
            playerVars: {
              start: initialTime,
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
  [
    410,
    "stress and energy",
    "https://ww2.kqed.org/app/uploads/sites/23/2021/09/iStock-1224548497-800x640.jpg",
  ],
  [
    431,
    "immune system",
    "https://www.slohealthcenter.com/wp-content/uploads/2021/11/how-important-food-is-for-strengthening-the-immune-system-1140x703-1.jpeg",
  ],
  [
    436,
    "learning and memory",
    "https://online.sunderland.ac.uk/wp-content/uploads/2022/01/Graphic-of-a-head-with-cogs-in-the-brain-and-people-around-it.jpg",
  ],
  [
    445,
    "nootropics",
    "https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/01/Medicine-Pills-Drug-Concept-header.jpg?w=1155&h=1528",
  ],
  [
    460,
    "comfort foods",
    "https://insanelygoodrecipes.com/wp-content/uploads/2021/03/Homemade-French-Toast-with-Strawberries-and-Chocolate-Syrup.png",
  ],
];

export default VisualAudio;
