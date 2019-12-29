import React from 'react'
import Centered from '../layouts/centered'

import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import charts from '../states/index'
import Form from '../components/form'
import JSON from '../components/json'
import SavedForms from '../components/savedForms'

const overmind = createOvermind(charts)

const Home = () => {
  return (
    <Provider value={overmind}>
      <Centered>
        <SavedForms/>
        <Form/>
        <JSON/>
      </Centered>
    </Provider>
  )
}

export default Home
