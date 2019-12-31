import fauna from 'faunadb'
import secretKey from '../env/faunakey'

export const defaultForm = {
  photos:[],
  imagesURL:[]
}

export default {
  login: null,
  requests: [],
  activeForm:{...defaultForm},
  errors:[],
  activeFaunaClient:new fauna.Client({secret:secretKey}),

  //For loged in users
  fetchedRamps: []

  //State machines
  //Login flow
  //Form flow
  //?? FetchRamps flow


  //isLogingIn
  //secretKey
  //
}