import { Chat } from "@/components/chat";

const IndexPage = () => <Chat prompt={defaultPrompt} AILabel={"AI"} />;

const defaultPrompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

You: `;
export default IndexPage;
