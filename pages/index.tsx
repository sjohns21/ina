import { Chat02 } from "@/components/chat-02";

const IndexPage = () => <Chat02 prompt={defaultPrompt} AILabel={"AI"} />;

const defaultPrompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

You: `;
export default IndexPage;
