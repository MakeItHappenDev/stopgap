import removeItem from '../helpers/removeItem'
import asyncForEach from '../helpers/asyncForEach'
import PouchDB from 'pouchdb'
const imageDB = new PouchDB('photos',{auto_compaction: true})
const savedDB = new PouchDB('savedForms',{auto_compaction: true})

const checkForms = async () => {
  const doc = await savedDB.allDocs()
  console.log("check forms ",doc)
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
  },
  deleteSavedForm: async ({actions},id) => {
    try{
      const form = await savedDB.get(id)
      const savedForm = JSON.parse(form.form)
      //Kill all photos to save space
      await asyncForEach(savedForm.photos,async function (photo){
        await removeItem(imageDB,photo)
      })
      await removeItem(savedDB,id)

      await actions.savedFormLookup()

    }
    catch(e){
      actions.addError(e.toString())
    }
  },
  sendAllSavedForms: ({state}) => {

  },

}