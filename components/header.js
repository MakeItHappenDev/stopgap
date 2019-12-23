import React from 'react'
import Link from 'next/link'

import LoginModal from './loginModal'
import { useOvermind } from '../states/index'
import styles from './header.module.scss'


export default () => {
  
  const {state,actions} = useOvermind()
  const loginState = state.states[1][1]
  const isModal = (loginState === 'SHOWN' || loginState === 'TRYING' || loginState === 'ERROR')
  const isLogged = loginState === 'SUCCESS'
  const isntLogged = loginState === 'HIDDEN'
  return(
    <>
      {isModal && <>
        <LoginModal />
        <Heading>
          <button>Loging-in</button>
        </Heading>
      </>}
      {isLogged && <>
        <Heading>
          <Link href="/ramps"><a>Ramp Requests</a></Link>
          <button onClick={()=>actions.logout()}>Logout</button>
        </Heading>
      </>}
      {isntLogged && <>
      <Heading>
        <button onClick={()=>actions.popLoginModal()}>Login</button>
        </Heading>
      </>}
    </>
  )
}

const Heading = (props) => {
  return(
    <header className={styles.header}>
      <Link href="/"><h1>StopGap</h1></Link>
      {props.children}
    </header>
  )
}