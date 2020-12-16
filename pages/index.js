import Head from 'next/head'
import Header from '@components/Header'
import BuiltImage from '@components/BuiltImage'
import QueryImage from '@components/QueryImage'
import Footer from '@components/Footer'

export default function Home(props) {
  let { image, info } = props

  return (
    <>
      <Head>
        <title>NASA Demo!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <Header title="NASA Demo" />

        <div className="content">
          <main>
            <div className="build-time">
              This image was fetched and rendered at build time. <br />
              <div className="spacer"></div>
              <BuiltImage image={image} info={info} />
            </div>
            <div>
              This lets you query an image at runtime. <br />
              <QueryImage />
            </div>
          </main>

          <a href="https://github.com/cassidoo/next-nasa-demo">See the repo for this demo here!</a>
        </div>

        <Footer />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://images-api.nasa.gov/search?q=neptune`)
  const data = await res.json()

  let image = data.collection.items[0].links[0].href
  let info = data.collection.items[0].data[0]

  return {
    props: { image, info },
  }
}
