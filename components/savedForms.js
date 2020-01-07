import React, { useState,useEffect } from 'react'

import PouchDB from 'pouchdb'
import { useOvermind } from '../states/index'


const savedDB = new PouchDB('savedForms',{auto_compaction: true})

import styles from './savedForms.module.scss'


const checkForms = async () => {
  const doc = await savedDB.allDocs()
  return doc.rows
}


export default () => {
  const {state} = useOvermind()

  useEffect(()=>{
    console.log("refreshing savedForms")
    const fetchForms = async () => {
      const nbr = await checkForms()
      setForms(nbr)
    }
    fetchForms()
  },[])

  const [forms,setForms] = useState([])

  return (
    <aside className={styles.savedForm}>
      {(forms.length > 0 || state.savedForms.length > 0) && <>
        <p>You have currently {forms.length} form(s) waiting to be uploaded.</p>
        <ul>
          {forms.map(row => <li key={`savedForm-${row.id}`}>{row.id}</li>)}
          {state.savedForms.map(row => <li key={`savedForm-${row}`}>{row}</li>)}
        </ul>
      </>}
    </aside>
  )
}