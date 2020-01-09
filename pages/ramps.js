import React from 'react'
import Centered from '../layouts/centered'

//import JSON from '../components/json'
import Ramps from '../components/ramps'


const Home = () => {

  return (
      <Centered>
        <Ramps/>
      </Centered>
  )
}
Home.getInitialProps = ({req,res}) => {
  //if SSR, redirect to "/"
  if(req){
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    res.writeHead(302, {
      Location: `${protocol}://${req.headers.host}/`
    })
    res.end()
  }
  return {}
} 

export default Home
