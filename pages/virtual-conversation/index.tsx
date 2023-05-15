import Layout from "@/components/Layout";
import { Button, Input } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";

const VirtualConversationPage = () => {
  const router = useRouter();
  const posthog = usePostHog();
  const [character, setCharacter] = useState("");

  return (
    <Layout title="Chat with an AI copy of Anyone">
      Chat with an AI copy of:
      <Input
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        sx={{ pl: 1 }}
      />
      {character && (
        <Button
          variant="text"
          onClick={() => {
            posthog?.capture("start virtual conversation", { character });
            router.push(
              "/virtual-conversation/" + character.replaceAll(" ", "-")
            );
          }}
        >
          Start
        </Button>
      )}
    </Layout>
  );
};

export default VirtualConversationPage;
