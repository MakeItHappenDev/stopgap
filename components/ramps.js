import React, {useEffect} from 'react'
import Router from 'next/router'


import { useOvermind } from '../states/index'


export default () => {

  const {state,actions} = useOvermind()
  
  //Nothing to do here in /ramps if not loggedin
  if(state.matches({login:{SUCCESS:false}})){
    Router.push('/')
  }

  useEffect(()=>{
    //If use

    //actions.fetchRamps()
  },[])

  const isFetching = state.matches({ramps:{FETCHING:true}})
  const isEmpty = state.matches({ramps:{EMPTY:true}})
  const isDisplay = state.matches({ramps:{DISPLAY:true}})
  const isError = state.matches({ramps:{ERROR:true}})

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