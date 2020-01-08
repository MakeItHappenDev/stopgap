export default {
  initial:'EMPTY',
  states:{
    EMPTY:{
      on:{
        setField:'FILLING',
        resumeForm:'EMPTY',
        reloadForm:'EMPTY'
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
        resetForm:'EMPTY',
        stashForm:'SAVING',
        sendForm:'SENDING',
      }
    },
    SENDING:{
      on:{
        successSendForm:'EMPTY',
        failSendForm:'COMPLETED'
      }
    },
    SAVING:{
      on:{
        saved:'EMPTY'
      }
    }
  }
}