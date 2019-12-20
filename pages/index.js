import React, {useState,useEffect} from 'react'
import fauna from 'faunadb'
import secretKey from '../env/faunakey'

const q = fauna.query

const Home = () => {

  const [email, setEmail] = useState('arthur@juchereau.com')
  const [password, setPassword] = useState('test')
  const [client,setClient] = useState(null)
  const [logedInClient,setLogedInClient] = useState(null)
  const [ramps,setRamps] = useState([])
  const [singleStep,setSingleStep] = useState("")
  const [nonResidential,setNonResidential] = useState("")
  //const [secret,setSecret] = useState(null)


  const requestNewRamp = () => {

    const activeClient = logedInClient || client

    activeClient.query(q.Create(q.Collection('ramps'),{
      data:{
        singleStep,
        nonResidential
      }
    })).then(consoleLogMe).catch(catchMe)
    
  }

  useEffect(()=>{
    setClient(new fauna.Client({secret:secretKey}))
    console.log(client)
  },[])

  const consoleLogMe = (response) => console.log(JSON.stringify(response,null,1))
  const catchMe = (err) => console.log(err)

  const tryLogin = ()=> {
    //test email + password login faunaDB
    const myLogin = client.query(
      q.Login(q.Match(q.Index("user_by_email"),email),
      {password:password}))
      myLogin.then((response)=>{
        //setSecret(response.ref.secret)
        setLogedInClient(new fauna.Client({secret:response.secret}))
        console.log(response)
      }).catch((err)=>console.log(err.toString()))

  }
  const logout = () => {
    const logMeOut = logedInClient.query(
      q.Logout(true)
    )
    logMeOut.then((response)=> {
      setLogedInClient(null)
      console.log(response)
    }).catch(err => console.log(err.toString()))

  }

  const fetchRamps = () =>  {
    /* logedInClient.query(
      q.Paginate(q.Match(q.Index('all_ramps_ordering')))
    ).then(response=>{
      return response.data.map(ramp =>
        ({singleStep:ramp[0],nonResidential:ramp[1],test:ramp[2]}))
    })
    .then(consoleLogMe).catch(catchMe) */

    logedInClient.query(
      q.Map(q.Paginate(q.Match(q.Index('all_ramps'))),
        q.Lambda('ref',q.Get(q.Var('ref')))
      )
    ).then(response => response.data.map(ramp=>ramp.data))
    .then(ramps => {setRamps(ramps)}).catch(catchMe)
  }

   return (
    <>
    {!logedInClient && 
      <>
      <h1>login</h1>
      <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={()=>tryLogin()}>Login</button>
      </>
    }
    {logedInClient && 
      <>
      <h1>Logout</h1>
      <button onClick={()=>logout()}>Logout</button>

      <h2>All ramps</h2>
      <button onClick={()=>fetchRamps()}>FetchRamps</button>
      <ul>
        {ramps.map(r=><li>{JSON.stringify(r)}</li>)}
      </ul>

      </>
    }

    <h1>Add ramp</h1>
    <input value={singleStep} onChange={(e)=>setSingleStep(e.target.value)} />
    <input value={nonResidential} onChange={(e)=>setNonResidential(e.target.value)} />
    <button onClick={()=>requestNewRamp()}>Request New Ramp</button>

    </>
  )
}

export default Home
