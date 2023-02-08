import Layout from '../components/Layout'
import {useState} from "react"

const fetcher = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]) => fetch(...args).then((res) => res.json())

const IndexPage = () => {
  const [thread, setThread] = useState(initialThread)
  const [addition, setAddition] = useState('')
  return (
    <Layout title="Chat App">
      <h1>Chat App</h1>
      <textarea value={thread} readOnly style={{width: '100%', height: 200}}/>
      <input value={addition} onChange={e => setAddition(e.target.value)}/>
      <button onClick={async () => {
        let response = await fetcher(`/api/chat?thread=${thread + addition}`)
        setThread(thread + addition + "\n" + response + "Human: ")
        setAddition('')
      }
      }>send
      </button>
    </Layout>
  )
}

const initialThread = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

Human: Hello, who are you?
AI: I am an AI created by OpenAI. How can I help you today?
Human: `
export default IndexPage
