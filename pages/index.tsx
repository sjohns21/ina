import { Chat } from "@/components/chat";

const IndexPage = () => <Chat prompt={defaultPrompt} />;

const defaultPrompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

Human: `;
export default IndexPage;
