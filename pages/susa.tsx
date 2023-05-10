import { useState } from "react";

type Props = {};
const Susa = (props: Props) => {
  const [chatHistory, setChatHistory] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [solutions, setSolutions] = useState(false);
  return (
    <div>
      <div>
        <h2>chat history</h2>
        <button
          onClick={() =>
            setChatHistory(
              "User: Ive been spending a lot of time by myself lately. What are some\n" +
                "          activities or hobbies that I can do to keep myself occupied?"
            )
          }
        >
          upload
        </button>
        {chatHistory && (
          <div>
            <h3>preview</h3>
            {chatHistory}
            <div>...</div>
          </div>
        )}
      </div>
      <div>
        <h2>health problems</h2>
        <button
          onClick={() => {
            setProblems(["lonliness"]);
          }}
        >
          detech health problems
        </button>
        <ul>
          {problems.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>solutions</h2>
        <button onClick={() => setSolutions(true)}>suggest solutions</button>
        {solutions && (
          <>
            <h3>local events</h3>
            <ul>
              <li>meetup at dolores</li>
              <li>hackathon at susa</li>
              <li>a group meditation in the mission</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
export default Susa;
