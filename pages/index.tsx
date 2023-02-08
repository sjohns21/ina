import Layout from '../components/Layout'
import useSWR from 'swr'

const fetcher = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]) => fetch(...args).then((res) => res.json())

const IndexPage = () => {
  const {data, error} = useSWR('/api/chat', fetcher)
  console.log('data', data)
  return (
    <Layout title="Chat App">
      <h1>Chat App</h1>
      {data}
    </Layout>
  )
}

export default IndexPage
