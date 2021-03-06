import React from 'react'
import Header from '../components/header'
import Errors from '../components/errors'

import styles from './centered.module.scss'

export default (props) => {
  return(
    <>
      <Errors/>
      <Header/>
      <>
        {props.children}
      </>
    </>
  )
}