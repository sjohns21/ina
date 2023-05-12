import Layout from "@/components/Layout";
import { Button, Input } from "@mui/material";
import { Chat02 } from "@/components/chat-02";
import { useRouter } from "next/router";

const PersonPage = () => {
  const router = useRouter();
  const character = String(router.query.person).replaceAll("-", " ");

  return (
    <Layout title="Virtual Conversation">
      Have a virtual conversation with an AI copy of:
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

export default PersonPage;
