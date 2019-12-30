export default (db,id) => {
  //Destroy pouchDB image
  db.get(id).then(function(doc) {
  return db.remove(doc);})
}