import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Errors from '../components/errors'

import styles from './centered.module.scss'

export default (props) => {
  return(
    <article className={styles.container}>
      <Errors/>
      <Header/>
      <>
        {props.children}
      </>
      <Footer />
    </article>
  )
}