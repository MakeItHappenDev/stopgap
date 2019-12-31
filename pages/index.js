import React from 'react'
import Centered from '../layouts/centered'

import Form from '../components/form'
import JSON from '../components/json'
import SavedForms from '../components/savedForms'


const Home = () => {
  return (
      <Centered>
        <SavedForms/>
        <Form/>
        <JSON/>
      </Centered>
  )
}

export default Home
