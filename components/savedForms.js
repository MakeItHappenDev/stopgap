import React, { useState,useEffect } from 'react'

import PouchDB from 'pouchdb'
const savedDB = new PouchDB('savedForms',{auto_compaction: true})

import styles from './savedForms.module.scss'


const checkForms = async () => {
  const doc = await savedDB.allDocs()
  //console.log(doc)
  return 0
}


export default () => {
  useEffect(()=>{
    const fetchForms = async () => {
      const nbr = await checkForms()
      setForms(nbr)
    }
    fetchForms()
  },[])
  const [forms,setForms] = useState(0)

  return (
    <aside className={styles.savedForm}>
      {forms > 0 && <>
        <p>You have currently {forms} form(s) waiting to be uploaded.</p>
        <nav>
          <button>Clear</button>
          <button>View</button>
          <button>Send</button>
        </nav>
      </>}
    </aside>
  )
}