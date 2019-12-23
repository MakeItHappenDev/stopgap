import fauna from 'faunadb'
import secretKey from '../env/faunakey'

const defaultForm = {
  singleStep:null,
}

export default {
  login: null,
  requests: [],
  activeForm:{},
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