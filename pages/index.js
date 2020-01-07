import React from 'react'
import Centered from '../layouts/centered'

import Form from '../components/form'
import SavedForms from '../components/savedForms'


const Home = () => {
  return (
      <Centered>
        <SavedForms/>
        <Form/>
      </Centered>
  )
}

export default Home
