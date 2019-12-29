import React from 'react'

import PouchDB from 'pouchdb'
const savedDB = new PouchDB('savedForms',{auto_compaction: true})

export default () => {
  return (
    <aside>
      You have currently no saved form waiting to be uploaded.
    </aside>
  )
}