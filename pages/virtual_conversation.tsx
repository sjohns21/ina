import Layout from "@/components/Layout";
import { Button, Input } from "@mui/material";
import { useState } from "react";
import { Chat } from "@/components/chat";

type Props = {};
const VirtualConversationPage = (props: Props) => {
  const [character, setCharacter] = useState("");
  const [characterSet, setCharacterSet] = useState(false);
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
        <Button variant="text" onClick={() => setCharacterSet(true)}>
          Start
        </Button>
      ) : (
        <Chat
          prompt={`The following is a conversation with ${character}.

You: Who are you?`}
          AILabel={character}
        />
      )}
    </Layout>
  );
};

export default VirtualConversationPage;
