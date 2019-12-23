import React from 'react'
import { useOvermind } from '../states/index'

import styles from './errors.module.scss'

export default () => {

  const {state,actions} = useOvermind()
  return(
    <>
      {state.errors.length >0 && <ul className={styles.errors}>
        {state.errors.map((e,i)=><li key={`error-${i}`}>{e}</li>)}
        <li onClick={()=>actions.clearErrors()}>Clear errors</li>
      </ul>}
    </>
  )
}