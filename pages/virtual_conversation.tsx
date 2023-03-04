import Layout from "@/components/Layout";
import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Chat02 } from "@/components/chat-02";
import { useRouter } from "next/router";

type Props = {};
const VirtualConversationPage = (props: Props) => {
  const router = useRouter();
  const [character, setCharacter] = useState("");
  const [characterSet, setCharacterSet] = useState(false);
  useEffect(() => {
    if (router.query.with) setCharacter(String(router.query.with));
  }, [router.query.with]);
  return (
    <Layout title="Virtual Conversation">
      Have a virtual conversation with an AI copy of:
      <Input
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        readOnly={characterSet}
        sx={{ pl: 1 }}
      />
      {!characterSet ? (
        <Button
          variant="text"
          onClick={() => character && setCharacterSet(true)}
        >
          Start
        </Button>
      ) : (
        <>
          <Button variant="text" onClick={() => router.reload()}>
            New Chat
          </Button>
          <Chat02
            prompt={`The following is a conversation with ${character}.\n\nYou: Who are you?`}
            AILabel={character as string}
          />
        </>
      )}
    </Layout>
  );
};

export default VirtualConversationPage;
