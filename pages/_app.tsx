import Head from 'next/head'
import { RecoilRoot } from 'recoil'

import Header from '../components/header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <title>Hackernews</title>
        <meta name="description" content="Hackernews" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon.png" rel="icon" type="image/png" sizes="48x48" />
        <link href="/favicon.png" rel="apple-touch-icon"></link>
        <meta name="theme-color" content="#c05621" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
