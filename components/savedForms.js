import React, { useState,useEffect } from 'react'

import { useOvermind } from '../states/index'



import styles from './savedForms.module.scss'




export default () => {
  const {state,actions} = useOvermind()

  useEffect(()=>{
    const fetchForms = async () => {
      await actions.savedFormLookup()
    }
    fetchForms()
  },[])


  return (
    <aside className={styles.savedForm}>
      {state.savedForms.length === 0 && 
        <p>No saved form</p>}
      {state.savedForms.length > 0 && <>
        <p>Saved forms: {!state.actions.reloadForm && <span>You need to have an empty form for resuming a saved form</span>}</p>
        <ul>
          {state.savedForms.map(row => row.id).map(row => <li key={`savedForm-${row}`}><p>{row}{state.actions.reloadForm && <span onClick={()=>actions.reloadForm(row)}> (resume)</span>}</p><nav onDoubleClick={()=>actions.deleteSavedForm(row)}>delete (double click)</nav></li>)}
        </ul>
      </>}
    </aside>
  )
}