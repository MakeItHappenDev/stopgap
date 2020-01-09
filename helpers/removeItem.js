export default async (db,id) => {
  //Destroy pouchDB image
  try{
    const doc = await db.get(id)
    return await db.remove(doc)
  }
  catch(e){
    console.log(e)
  }

}