export default {
  initial: 'EMPTY',
  states:{
    EMPTY:{
      on:{
        fetchRamps:'FETCHING'
      }
    },
    FETCHING:{
      on:{
        successFetchRamps:'DISPLAY',
        failFetchRamps:'ERROR'
      }
    },
    DISPLAY:{
      on:{
        fetchRamps:'FETCHING'
      }
    },
    ERROR:{
      on:{
        fetchRamps:'FETCHING'
      }
    }

  }
}