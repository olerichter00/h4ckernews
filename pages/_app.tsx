import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { CookiesProvider } from 'react-cookie'

import Layout from '../components/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <Head>
          <title>H4ckernews</title>
          <meta name="description" content="A beautiful hackernews client" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link href="/favicon.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/favicon.png" rel="icon" type="image/png" sizes="48x48" />
          <link href="/favicon.png" rel="apple-touch-icon"></link>
          <meta name="theme-color" content="#FFFFFF" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </CookiesProvider>
  )
}

export default MyApp
