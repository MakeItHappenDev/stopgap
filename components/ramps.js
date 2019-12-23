import React, {useEffect} from 'react'
import Router from 'next/router'


import { useOvermind } from '../states/index'


export default () => {

  const {state,actions} = useOvermind()
  
  //Nothing to do here in /ramps if not loggedin
  if(state.states[1][1]!=='SUCCESS'){
    Router.push('/')
  }

  useEffect(()=>{
    //If use

    //actions.fetchRamps()
  },[])

  const activeState = state.states[2][1]
  const isFetching = activeState === 'FETCHING'
  const isEmpty = activeState === 'EMPTY'
  const isDisplay = activeState === 'DISPLAY'
  const isError = activeState === 'ERROR'

  return(
    <>
      {isDisplay && <>
        <button onClick={()=>actions.fetchRamps()}>refetch</button>
        <ul>
          {JSON.stringify(state.fetchedRamps)}
        </ul>
      </>}
      {isEmpty && <>
        <button onClick={()=>actions.fetchRamps()}>refetch</button>
      </>}
      {isFetching && <>
        <p>Currently Fetching</p>
      </>}
      {isError && <>
        <button onClick={()=>actions.fetchRamps()}>refetch</button>
      </>}
    </>
  )
}