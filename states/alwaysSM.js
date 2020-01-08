export default {
  initial:'ALWAYS',
  states:{
    'ALWAYS':{
      on:{
        addError:'ALWAYS',
        clearErrors:'ALWAYS',
        savedFormLookup:'ALWAYS',
        deleteSavedForm:'ALWAYS',
        sendAllForms:'ALWAYS'
      }
    }
  }
}