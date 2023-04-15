import Layout from "@/components/Layout";
import { Chat } from "@/components/chat";

type Props = {};
const TutorPage = (props: Props) => {
    return (
        <Layout title="Tutor Bot">
            Chat with an AI tutor
            <Chat />
        </Layout>
    );
};

export default TutorPage;