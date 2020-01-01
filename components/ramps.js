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
        <main>
          <button onClick={()=>actions.fetchRamps()}>refetch</button>
         {state.fetchedRamps.map((r,i)=>
         <article key={`ramp-${i}`}>
           {JSON.stringify(r,null,1)}
         </article>
         )}
        </main>
      </>}
      {isEmpty && <>
        <button onClick={()=>actions.fetchRamps()}>refetch</button>
      </>}
      {isFetching && <>
        <p>Currently Fetching</p>
      </>}
      {isError && <>
        <button onClick={()=>actions.fetchRamps()}>Error refetch</button>
      </>}
    </>
  )
}