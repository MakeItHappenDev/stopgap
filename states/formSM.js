export default {
  initial:'EMPTY',
  states:{
    EMPTY:{
      on:{
        setField:'FILLING',
        sendAllSavedForms:'SENDING'
      }
    },
    FILLING:{
      on:{
        setField:'FILLING',
        resetForm:'EMPTY',
        completeForm:'COMPLETED'
      }
    },
    COMPLETED:{
      on:{
        clearField:'FILLING',
        setField:'COMPLETED',
        saveForm:'SAVING',
        sendForm:'SENDING',
      }
    },
    SENDING:{
      on:{
        successSendForm:'EMPTY',
        failSendForm:'EMPTY'
      }
    },
    SAVING:{
      on:{
        saveForm:'EMPTY'
      }
    }
  }
}