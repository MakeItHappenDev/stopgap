import React,{useState} from 'react'
import styles from './loginModal.module.scss'
import { useOvermind } from '../states/index'

export default () => {
  
  const {state,actions} = useOvermind()
  const [email,setEmail] = useState('arthur@juchereau.com')
  const [password,setPassword] = useState('')

  return(
    <>
      <div className={styles.background} onClick={()=>actions.exitLoginModal()}></div>
      <nav className={styles.loginModal}>
        <h1>Hello</h1>
        <input value={email} onChange={e=>setEmail(e.target.value)}/>
        <input value={password} type="password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={()=>actions.tryLogin({email,password})}>login</button>
      </nav>
    </>
  )
}