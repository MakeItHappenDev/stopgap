import React, {useState,useEffect} from 'react'
import PouchDB from 'pouchdb'

import {useOvermind} from '../states/index'
const db = new PouchDB('photos',{auto_compaction: true})
import removeItem from '../helpers/removeItem'

const storeImage = async (image) => {

  //Generate an ID
  const id = new Date().toISOString()

  //Create a document + Attach picture
  const myDoc = {
    _id: id,
    _attachments:{
      'picture':{
        content_type:image.type,
        data:image
      }
    }
  }

  //Add to pouchDB
  try{
    const put = await db.put(myDoc)
    //return the ID
    return put
  }
  catch(e){
    throw e
  }
}

const getImages = async (photos) => {

  //If no photo, bypass logic
  if(!photos || photos.length === 0){
    //console.log("return empty array")
    return []
  }
  //Fetch all documents having ID of the activeForm
  const allDocs = await db.allDocs({include_docs: true, keys:photos})
  //Target documents, to get IDs of the photos
  const mappedDocs = allDocs.rows.map(r=>r.doc)
  //console.log(mappedDocs)
  let attachments = []
  for(var i=0;i<mappedDocs.length;i++){
    //MappedDocs can be null
    if(mappedDocs[i]){
      const blob = await db.getAttachment(mappedDocs[i]._id, 'picture')
      attachments.push(URL.createObjectURL(blob))
    }
  }
  return attachments
}

export default (props) =>{

  const {state,actions} = useOvermind()
  const [images,setImages] = useState([])

  const pouchifyImage = async (e) => {
    const put = await storeImage(e.target.files[0])
    const newPhotos = [...state.activeForm[props.field],put.id]
    actions.setField({field:props.field,value:newPhotos})
    //setImages(await getImages(newPhotos))
  }

  useEffect(()=>{
    const showBlobs = async (photos) => {
      setImages(await getImages(photos))
    }
    showBlobs(state.activeForm['photos'])
  },[state.activeForm.photos])




  return(
    <>
        <input type="file" onChange={e=>pouchifyImage(e)}/>
        {state.activeForm.photos.length > 0 && images.map((image,i)=><DisplayImage image={image} index={i} field={props.field} key={`image-${image}`}/>)}
        {state.activeForm.imagesURL.map((image,i)=><DisplayImage disabled={true} image={image} key={`image-${state.activeForm.imagesURL[i]}`}/>)}
        
    </>
  )
}

const DisplayImage = (props) => {
  const {state,actions} = useOvermind()
  const removeImage = () => {
    //Fetch ID to delete
    const id = state.activeForm[props.field][props.index]

    //Destroy pouchDB image
    removeItem(db,id);

    //Save new state
    const newPhotos = state.activeForm[props.field].filter(p=>p !== id)
    actions.setField({field:props.field,value:newPhotos})
  }
  return (
    <figure>
      <img src={props.image}  />
      {!props.disabled && <button onClick={()=>removeImage()}>X</button>}
    </figure>
  ) 
}