export default async (array,callback) => {
  for(let i = 0;i < array.length;i++){
    console.log("trigger asyncForEach ",i,array[i])
    await callback(array[i],i,array)
  }
  console.log("asyncForEachExit")
}