import Layout from "@/components/Layout";
import { useState } from "react";

type Props = {};
const TutorPage = (props: Props) => {
  const [raw, setRaw] = useState(defaultRaw);
  const [x3, setX3] = useState<string[]>([]);
  return (
    <Layout title="Feedback">
      <h1>Feedback</h1>
      <div className={"flex"}>
        <div className={"w-1/3"}>
          <h2>raw</h2>
          {raw.map((r, ri) => (
            <div key={ri} className={"m-2"}>
              "{r}"
            </div>
          ))}
        </div>
        <div className={"w-1/3"}>
          <h2>summarized x 3</h2>
          <button
            onClick={async () => {
              const chunkSize = 3;
              for (let i = 0; i < raw.length / chunkSize; i++) {
                const chunk = raw
                  .slice(i * chunkSize, i * chunkSize + chunkSize)
                  .join("\n");
                const prompt = `Summarize this:\n\n${chunk}`;
                const completion = await (
                  await fetch(
                    encodeURI(
                      `/api/openai/completion?temperature=.7&prompt=${prompt}`
                    )
                  )
                ).text();
                setX3((prev) => {
                  const next = [...prev];
                  next[i] = completion;
                  return next;
                });
              }
            }}
          >
            button
          </button>
          {x3.map((r, ri) => (
            <div key={ri} className={"m-4"}>
              "{r}"
            </div>
          ))}
        </div>
        <div className={"w-1/3"}>
          <h2>summarized x 9</h2>
        </div>
      </div>
    </Layout>
  );
};

const defaultRaw = [
  "I love how easy it is to find and compare different health products on this app. It saves me so much time and effort!",

  "The interface is really user-friendly and intuitive. I had no trouble navigating the app and making a purchase.",

  "I appreciate the variety of health products available on this app. I was able to find exactly what I was looking for.",

  "The customer service team was so helpful when I had a question about my order. They responded quickly and resolved my issue in no time.",

  "I really like how the app offers personalized recommendations based on my health needs and preferences.",

  "The app could benefit from more detailed product descriptions and reviews. Sometimes I feel like I don't have enough information to make an informed decision.",

  "It would be great if the app had more options for filtering and sorting products. I often find myself scrolling through pages of irrelevant items.",

  "The checkout process was seamless and secure. I appreciate the extra security measures to protect my personal information.",

  "I had a great experience using this app overall. I would definitely recommend it to others looking for health products online.",
];
export default TutorPage;
