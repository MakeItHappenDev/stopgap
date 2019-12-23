import React from 'react'
import Centered from '../layouts/centered'

import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import charts from '../states/index'
import JSON from '../components/json'
import Ramps from '../components/ramps'

const overmind = createOvermind(charts)

const Home = () => {

  return (
    <Provider value={overmind}>
      <Centered>
        <Ramps/>
        <JSON/>
      </Centered>
    </Provider>
  )
}
Home.getInitialProps = ({res}) => {
  //if SSR, redirect to "/"
  if(res){
    res.writeHead(302, {
      Location: '/'
    })
    res.end()
  }
  return {}
}

export default Home
