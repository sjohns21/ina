import Layout from "@/components/Layout";
import { useState } from "react";
import { TextareaAutosize } from "@mui/material";

type Props = {};
const FeedbackAnalyzerPage = (props: Props) => {
  const [raw, setRaw] = useState(defaultRaw);
  const [useful, setUseful] = useState<string[]>(defaultUseful);
  const [problems, setProblems] = useState<string[]>([]);
  return (
    <Layout title="Feedback Analyzer">
      <h1>Feedback Analyzer</h1>
      <button onClick={() => (setRaw([""]), setUseful([]))}>reset</button>
      <div className={"flex"}>
        <div className={"w-1/3"}>
          <h2>raw feedback</h2>
          {raw.map((r, ri) => (
            <div key={ri}>
              <TextareaAutosize
                className={"m-2 w-3/4"}
                value={r}
                onChange={(e) =>
                  setRaw((prev) => {
                    const next = [...prev];
                    next[ri] = e.target.value;
                    return next;
                  })
                }
              />
            </div>
          ))}
          <button
            onClick={() =>
              setRaw((prev) => {
                const next = [...prev];
                next[next.length] = "";
                return next;
              })
            }
          >
            add
          </button>
        </div>
        <div className={"w-1/3"}>
          <h2>filter useful</h2>
          <button
            onClick={async () => {
              const useful = [];
              for (const rawItem of raw) {
                const prompt = `
                  User feedback: ${rawItem}
    
                  Is the user feedback useful? (Yes/No):`;
                const completion = await (
                  await fetch(
                    encodeURI(`/api/openai/completion?prompt=${prompt}`)
                  )
                ).text();
                if (completion.includes("Yes")) useful.push(rawItem);
              }
              setUseful(useful);
            }}
          >
            filter useful
          </button>
          {useful.map((r, ri) => (
            <div key={ri} className={"m-4"}>
              {r}
            </div>
          ))}
        </div>
        <div className={"w-1/3"}>
          <h2>find problems</h2>
          <button
            onClick={async () => {
              const problems = [];
              for (const item of useful) {
                const prompt = `
                  User feedback: ${item}
    
                  Does the user feedback indicate a problem? (Yes/No):`;
                const completion = await (
                  await fetch(
                    encodeURI(`/api/openai/completion?prompt=${prompt}`)
                  )
                ).text();
                if (completion.includes("Yes")) problems.push(item);
              }
              setProblems(problems);
            }}
          >
            find problems
          </button>
          {problems.map((item, index) => (
            <div key={index} className={"m-4"}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
const defaultRaw = [
  "Haha",
  "Does my health insurance cover this service?",
  "I love how easy it is to find and compare different health products on this app. It saves me so much time and effort!",
];
const defaultUseful = [
  "Does my health insurance cover this service?",
  "I love how easy it is to find and compare different health products on this app. It saves me so much time and effort!",
];
export default FeedbackAnalyzerPage;
