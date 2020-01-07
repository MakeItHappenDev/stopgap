import React from 'react'
import { useOvermind } from '../states/index'

export default () => {
  
  const {state} = useOvermind()
  return(
    <aside>
      <pre>{JSON.stringify(state.states,null,1)}</pre>
      <pre>{JSON.stringify(state.activeForm,null,1)}</pre>
      <pre>{JSON.stringify(state.actions,null,1)}</pre>
    </aside>
  )
}