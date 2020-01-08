import PouchDB from 'pouchdb'
const savedDB = new PouchDB('savedForms',{auto_compaction: true})

const checkForms = async () => {
  const doc = await savedDB.allDocs()
  return doc.rows
}

export default {
  addError: ({state},message) => {
    state.errors.push(message)
  },
  clearErrors: ({state}) => {
    state.errors = []
  },
  savedFormLookup: async ({state}) => {
    state.savedForms = await checkForms()
  }

}