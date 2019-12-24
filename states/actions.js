import fauna from 'faunadb'
import secretKey from '../env/faunakey'

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
  failLogin : ({state},message) => {
    state.errors.push(message)
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
    }).catch(err => console.log(err.toString()))
  },

  //Form
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
  },
  clearField: () => {},
  completeForm: () => {},
  saveForm: ({state}) => {

  },
  sendForm: ({state}) => {

  },
  resetForm: ({state}) => {
    state.activeForm = {}
  },
  sendAllSavedForms: ({state}) => {

  },
  successSendForm: ({state}) => {

  },
  failSendForm: ({state}) => {

  },


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
  failFetchRamps: ({state},error) => {

  },
  successFetchRamps: ({state},ramps) => {
    state.fetchedRamps = ramps
  },


  //General
  clearErrors: ({state}) => {
    state.errors = []
  }

}