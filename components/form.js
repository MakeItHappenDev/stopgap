import React from 'react'
import { useOvermind } from '../states/index'

import styles from './form.module.scss'
export default ()=> {

  const {state,actions} = useOvermind()
  //const isCompleted = state.matches({form:{COMPLETED:true}})
  

  return(

    <main className={styles.form}>

      <nav><button disabled={!state.actions.resetForm} onClick={()=>actions.resetForm()}>Reset Form</button></nav>
      <h1>Tell us about an Ottawa business that could use a StopGap ramp.</h1>
      <p className={styles.full}>* mandatory</p>
      <label>Is the location inaccessible due to a single step?*</label>
      <Choice field="singleStep" value="Yes"></Choice>
      <Choice field="singleStep" value="No"></Choice>
      <label>Is the location non-residential?*</label>
      <Choice field="nonResidential" value="Yes"></Choice>
      <Choice field="nonResidential" value="No"></Choice>

      <h1>Where would you like a ramp?</h1>
      <label>Business name *</label>
      <Input field="businessName"/>
      <label>Address *</label>
      <Input field="businessAddress"/>
      <label>Are you the owner of this business?*</label>
      <Choice field="owner" value="Yes"></Choice>
      <Choice field="owner" value="No"></Choice>

      <h1>Add a photo or two.</h1>
      <p className={styles.full}>Be sure to show the step and entryway.</p>
      <div className={styles.uploadBox}>
        <button>Upload</button>
        
      </div>

      <h1>Give us some extra information.</h1>
      <label>Is the sidewalk flat?*</label>
      <Choice field="sidewalkFlat" value="Yes"></Choice>
      <Choice field="sidewalkFlat" value="No"></Choice>
      <label>Is the step 34 inches or wider?*</label>
      <Choice field="wideStep" value="Yes"></Choice>
      <Choice field="wideStep" value="No"></Choice>
      <label>Is the step taller than 2 inches and shorter than 9 inches?*</label>
      <Choice field="properHeightStep" value="Yes"></Choice>
      <Choice field="properHeightStep" value="No"></Choice>


      <h1>Can we contact you about this request?</h1>
      <label>Can we contact you about this request?*</label>
      <Choice field="contactMe" value="Yes"></Choice>
      <Choice field="contactMe" value="No"></Choice>
      <label>Email address</label>
      <Input  field="requestEmail"/>

      <nav>
        <button disabled={!state.actions.saveForm}>Save</button>
        <button disabled={!state.actions.sendForm}>Send</button>
      </nav>


    </main>

  )
}

const Choice = props => {
  const {state,actions} = useOvermind()
  return (
    <p className={`${styles.answer} ${state.activeForm[props.field] == props.value?styles.selected:null}`} onClick={()=>actions.setField({field:props.field,value:props.value})}>{props.value}</p>
  )
}

const Input = props => {
  const {state,actions} = useOvermind()
  return (
    <input onChange={(e)=>actions.setField({field:props.field,value:e.target.value})} value={state.activeForm[props.field] || ""} />
  )
}