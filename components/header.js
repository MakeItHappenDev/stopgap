import React from 'react'
import Link from 'next/link'

import LoginModal from './loginModal'
import { useOvermind } from '../states/index'
import styles from './header.module.scss'


export default () => {
  
  const {state,actions} = useOvermind()
  const isLogged = state.matches({login:{SUCCESS:true}})
  const isntLogged = state.matches({login:{HIDDEN:true}})
  const isModal = !(isLogged || isntLogged)
  
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
      <nav>
        {props.children}
      </nav>
    </header>
  )
}