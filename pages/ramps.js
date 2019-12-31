import React from 'react'
import Centered from '../layouts/centered'

import JSON from '../components/json'
import Ramps from '../components/ramps'


const Home = () => {

  return (
      <Centered>
        <Ramps/>
        <JSON/>
      </Centered>
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
