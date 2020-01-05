import React, {useEffect} from 'react'
import Router from 'next/router'


import { useOvermind } from '../states/index'
import styles from './ramps.module.scss'


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
           <DisplayRamp {...r} key={`ramp-${i}`}/>
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

const DisplayRamp = (props) => {

  return(
    <article className={styles.ramp}>
      <h1>Business name : {props.businessName}</h1>
      <h2>business address: {props.businessAddress}</h2>
      <p className={props.singleStep === "Yes" ? styles.correct:styles.false}>Single Step</p>
      <p className={props.nonResidential === "Yes" ? styles.correct:styles.false}>Non Residential</p>
      <p className={props.Owner === "Yes" ? styles.correct:styles.false}>Owner</p>
      <p className={props.sidewalkFlat === "Yes" ? styles.correct:styles.false}>Sidewalk is flat</p>
      <p className={props.wideStep === "Yes" ? styles.correct:styles.false}>Wide step</p>
      <p className={props.preperHeightStep === "Yes" ? styles.correct:styles.false}>Proper height</p>
      <p className={props.contactMe === "Yes" ? styles.correct:styles.false}>Contact me : {props.email}</p>
      {props.imagesURL && props.imagesURL.map(photo=>(
        <figure><img src={photo} /></figure>
      ))}
    </article>
  )
}