import type { NextPage } from 'next'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Welcome</h1>
      <div className='info-holder'>
        <p>01tune (&quot;zero one tune&quot;) is a song idea generator.</p>
        <p>
          Currently, you can generate lyrics, chords, and structure for your
          song.
        </p>
      </div>
    </Layout>
  )
}

export default Home
