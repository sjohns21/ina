import Layout from "@/components/Layout";
import { Button, Input } from "@mui/material";
import { Chat02 } from "@/components/chat-02";
import { useRouter } from "next/router";

const PersonPage = () => {
  const router = useRouter();
  const character = String(router.query.person).replaceAll("-", " ");

  return (
    <Layout title={"Chat with an AI copy of " + character}>
      Chat with an AI copy of:
      <Input value={character} readOnly={true} sx={{ pl: 1 }} />
      <Button
        variant="text"
        onClick={() => router.push("/virtual-conversation")}
      >
        New Chat
      </Button>
      <Chat02
        prompt={`The following is a conversation with ${character}.\n\nYou: Who are you?`}
        AILabel={character}
      />
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: people.map((person) => ({
      params: { person: person.replaceAll(" ", "-") },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

const people = [
  "Naval Ravikant",
  "Andrew Huberman",
  "Elon Musk",
  "Bill Gates",
  "Oprah Winfrey",
  "Arianna Huffington",
  "Malcolm Gladwell",
  "Sheryl Sandberg",
  "Tony Robbins",
  "Richard Branson",
  "Barack Obama",
  "Steve Wozniak",
  "Deepak Chopra",
  "Rory Vaden",
  "Jack Canfield",
  "Neil deGrasse Tyson",
  "Melinda Gates",
  "Richard Dawkins",
  "Mark Cuban",
  "Gretchen Rubin",
  "Michael Phelps",
  "Simon Sinek",
  "Tim Ferriss",
  "Gary Vaynerchuk",
  "Ray Dalio",
  "Brene Brown",
  "Susan Cain",
  "Daniel Pink",
  "Amy Cuddy",
  "Al Gore",
  "Elizabeth Gilbert",
  "David Sedaris",
  "Chimamanda Ngozi Adichie",
  "Marc Benioff",
  "Dr. Sanjay Gupta",
  "Suze Orman",
  "Reid Hoffman",
  "Shonda Rhimes",
  "Nate Silver",
  "Joseph Stiglitz",
  "Michael Bloomberg",
  "Chris Anderson",
  "Tom Peters",
  "Jill Bolte Taylor",
  "Angela Duckworth",
  "Edward Snowden",
  "Adam Grant",
  "Cary Fowler",
  "Dan Ariely",
  "Dan Pink",
  "Diana Nyad",
  "Garry Kasparov",
  "Hans Rosling",
  "James Cameron",
  "Jeffrey Sachs",
  "John Wood",
  "Judith Rodin",
  "Kay Koplovitz",
  "Ken Robinson",
  "Malcolm Gladwell",
  "Margaret Atwood",
  "Meredith Walker",
  "Michael Lewis",
  "Nathaniel Philbrick",
  "Randy Pausch",
  "Reese Witherspoon",
  "Seth Godin",
  "Sheryl Sandberg",
  "Stephen Dubner",
  "Steve Case",
  "Tory Burch",
  "Tyler Cowen",
  "Walter Isaacson",
  "Willie Geist",
  "Yves Morieux",
  "Zainab Salbi",
];
export default PersonPage;
