import fauna from 'faunadb'
import secretKey from '../env/faunakey'

import formActions from './formActions'
import alwaysActions from './alwaysActions'



const q = fauna.query


export default {
  //Login
  popLoginModal : () => {},
  exitLoginModal : () => {},
  tryLogin : async ({state,effects,actions},{email,password}) => {
    const client = state.activeFaunaClient
    const response = await effects.tryLogin({email,password,client})
    if(response.error){
      const error = JSON.parse(response.error)
      actions.failLogin(error.requestResult.responseContent.errors[0].cause[0].description)
    }
    else{
      actions.successLogin(response)
    }
  },
  failLogin : ({actions},message) => {
    actions.addError(message)
  },
  successLogin : ({state},response) => {
    //Clears errors
    state.errors = []
    state.activeFaunaClient = response
  },
  //Logout of fauna + setback to Anybody role
  logout: ({state}) => {
    state.activeFaunaClient.query(
      q.Logout(true)
    ).then(()=> {
      state.activeFaunaClient = new fauna.Client({secret:secretKey})
    }).catch(err => actions.addError(err.toString()))
  },

  //Form
  ...formActions,


  // fetch Ramps flow
  fetchRamps: async ({state,effects,actions}) => {
    const client = state.activeFaunaClient
    const response = await effects.fetchRamps(client)
    if(response.error){
      console.log("ramp fail",response)
      const error = JSON.parse(response.error)
      actions.failFetchRamps(error)
    }
    else{
      console.log("ramp success",response)
      actions.successFetchRamps(response)
    }
  },
  failFetchRamps: ({actions},error) => {
    actions.addError(error)
  },
  successFetchRamps: ({state},ramps) => {
    state.fetchedRamps = ramps
  },


  //General
  ...alwaysActions

}