import React from 'react'
import Link from 'next/link'
import PouchDB from 'pouchdb'

const formDB = new PouchDB('form',{auto_compaction: true})
const imageDB = new PouchDB('photos',{auto_compaction: true})
const saveDB = new PouchDB('savedForms',{auto_compaction: true})

export default () => {
  formDB.destroy();
  imageDB.destroy();
  saveDB.destroy();
  return(
    <>
      <p>Reseting pouchDB(s)</p>
      <p>Go back to the main app <Link href="/"><a>here</a></Link></p>
    </>
  )
}