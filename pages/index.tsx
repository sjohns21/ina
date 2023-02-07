import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Chat App">
    <h1>Chat App</h1>
    <p>
      <Link href="/about">About</Link>
    </p>
  </Layout>
)

export default IndexPage
