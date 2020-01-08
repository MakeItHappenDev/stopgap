import React from 'react'
import Head from 'next/head'
import Centered from '../layouts/centered'

import Form from '../components/form'
import SavedForms from '../components/savedForms'


const Home = () => {
  return (
    <>
      <Head>
        <title>Stopgap ramp request</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="Description" content="Ramp request form to access businesses in the Ottawa area." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#973f7d"/>
        <link rel="apple-touch-icon" href="/img/logo.512.png"></link>
        <link rel="icon" type="image/png" href="/img/logo.192.png"></link>
      </Head>
      <Centered>
        <SavedForms/>
        <Form/>
      </Centered>
    </>
  )
}

export default Home

export function head() {
  return (
    <>
      <title>Stopgap ramp request</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
      
    </>
  )
}