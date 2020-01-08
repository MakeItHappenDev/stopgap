export default async (db,id) => {
  //Destroy pouchDB image
  const doc = await db.get(id)
  return await db.remove(doc)

}