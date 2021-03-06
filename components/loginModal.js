import React,{useState} from 'react'
import styles from './loginModal.module.scss'
import { useOvermind } from '../states/index'

export default () => {
  
  const {actions} = useOvermind()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  return(
    <>
      <div className={styles.background} onClick={()=>actions.exitLoginModal()}></div>
      <nav  className={styles.loginModal} onClick={e=>e.stopPropagation()}>
        <p>This section is restricted, only authorized people are allowed to see forms</p>
        <input value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input value={password} placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={()=>actions.tryLogin({email,password})}>login</button>
      </nav>
    </>
  )
}