import Layout from "@/components/Layout";
import { Button, Input } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

const VirtualConversationPage = () => {
  const router = useRouter();
  const [character, setCharacter] = useState("");

  return (
    <Layout title="Virtual Conversation">
      Have a virtual conversation with an AI copy of:
      <Input
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        sx={{ pl: 1 }}
      />
      {character && (
        <Button
          variant="text"
          onClick={() =>
            router.push(
              "/virtual-conversation/" + character.replaceAll(" ", "-")
            )
          }
        >
          Start
        </Button>
      )}
    </Layout>
  );
};

export default VirtualConversationPage;
