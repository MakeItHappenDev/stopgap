export default {
  initial:'HIDDEN',
  states:{
    HIDDEN:{
      on:{
        popLoginModal:'SHOWN'
      }
    },
    SHOWN:{
      on:{
        exitLoginModal:'HIDDEN',
        tryLogin:'TRYING'
      }
    },
    TRYING:{
      on:{
        exitLoginModal:'HIDDEN',
        failLogin:'ERROR',
        successLogin:'SUCCESS'

      }
    },
    ERROR:{
      on:{
        exitLoginModal:'HIDDEN',
        tryLogin:'TRYING'
      }
    },
    SUCCESS:{
      on:{
        logout: 'HIDDEN'
      }
    }
  }
}
