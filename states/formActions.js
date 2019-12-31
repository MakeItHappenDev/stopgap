import PouchDB from 'pouchdb'

import cloudinary from '../env/cloudinary'

import {defaultForm} from './state'
import debounce from '../helpers/debounce'
import asyncForEach from '../helpers/asyncForEach'
import removeItem from '../helpers/removeItem'

const formDB = new PouchDB('form',{auto_compaction: true})
const imageDB = new PouchDB('photos',{auto_compaction: true})

const instantSaveForm = async (state)=>{
  try{
    const doc = await formDB.get('activeForm')
    doc.form = JSON.stringify(state.activeForm)
    await formDB.put(doc)
  }
  catch(e){
    //Document not found
    const myDoc = {
      _id:'activeForm',
      form:JSON.stringify(state.activeForm)
    }
    const response = await formDB.put(myDoc)
    console.log("New db: ",response,JSON.stringify(e))
  }
}
const saveForm = debounce(instantSaveForm,500)

export default {
  resumeForm: async ({state,actions}) => {
    //Load from pouchDB
    try{
      const form = await formDB.get('activeForm')
      state.activeForm = JSON.parse(form.form)
      if(form.form !== JSON.stringify(defaultForm)){
        actions.setField({})
      }
    }
    catch(e){
      return console.log(JSON.stringify(e),"No prior database")
    }
  },
  setField: ({state,actions},{field,value}) => {
    state.activeForm[field] = value

    //Check if fields are filled
    if(state.activeForm.singleStep &&
      state.activeForm.nonResidential &&
      state.activeForm.businessName &&
      state.activeForm.businessName !== '' &&
      state.activeForm.businessAddress &&
      state.activeForm.businessAddress !== '' &&
      state.activeForm.owner &&
      state.activeForm.sidewalkFlat &&
      state.activeForm.wideStep &&
      state.activeForm.properHeightStep &&
      (
        (state.activeForm.contactMe === "Yes" && state.activeForm.requestEmail !== '' && state.activeForm.requestEmail) ||
        (state.activeForm.contactMe === "No")
      )
    ){
      //All fields are properly filled
      setTimeout(()=>actions.completeForm(),0)
    }
    else{
      //One or more field is Empty
      setTimeout(()=>actions.clearField(),0)
    }
    saveForm(state)
  },
  clearField: () => {},
  completeForm: () => {},
  stashForm: ({state}) => {

  },
  sendForm: async ({state,actions,effects}) => {

    //TODO wrap in an async function to delay faunaDB after cloudinary ingested the images
    const asyncRun = async () => {
      console.log("sending images to Cloudinary")
      //Send images first, then the rest
      await asyncForEach(state.activeForm.photos, async photo=>{
        //fetch photo + build fake form
        const blob = await imageDB.getAttachment(photo, 'picture')
        console.log(blob)

        const formData = new FormData()
        formData.append('upload_preset',cloudinary.preset)
        formData.append('tags','StopGap_FrontEnd')
        formData.append('file',blob)
        //send photo
        try{
          const res = await fetch(cloudinary.url,{
            method: 'POST',
            body:formData
          }) 
          if(res.ok){
            const payload = await res.json()
            console.log(payload)
            //Image uploaded, need to add url to imageURLs...
            state.activeForm.imagesURL? state.activeForm.imagesURL.push(payload.secure_url) : [payload.secure_url]
            // ... and remove from photos array + pop from pouchDB
            removeItem(imageDB,photo)
            state.activeForm.photos.splice(state.activeForm.photos.indexOf(photo),1)
          }
        }
        catch(e){
          console.error(e)
        }
      })
      
      instantSaveForm(state)
      //Sends to FaunaDB now
      console.log("sending to faunaDB")
      const client = state.activeFaunaClient
      const response = await effects.sendForm({client,form:{...state.activeForm}})
      console.log(response)
      if(response.error){
        return actions.failSendForm()
      }
      actions.successSendForm()
    }
    asyncRun();

  },
  sendingForm: ({state}) => {},
  resetForm: ({state}) => {
    state.activeForm.photos.forEach(p=>{
      //Remove each photos from the pouchDB
      removeItem(imageDB,p)
    })
    state.activeForm = {...defaultForm}
    instantSaveForm(state)
  },
  sendAllSavedForms: ({state}) => {

  },
  successSendForm: ({state}) => {
    state.activeForm = {...defaultForm}
    instantSaveForm(state)
  },
  failSendForm: ({state}) => {

  }
}