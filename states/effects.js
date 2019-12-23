import fauna from 'faunadb'

const q = fauna.query


export default {
  fetchRamps: async (client) => {
    return await client.query(
      q.Map(q.Paginate(q.Match(q.Index('all_ramps'))),
        q.Lambda('ref',q.Get(q.Var('ref')))
      )
    )
    .then(response => response.data.map(ramp=>ramp.data))
    .catch(err => ({error:JSON.stringify(err)}))
  },
  tryLogin: async ({email,password,client}) => {
    return await client.query(q.Call('login_safe', [email,password]))
      .then((response)=>{
        return new fauna.Client({secret:response.secret})
      }).catch((err)=>({error:JSON.stringify(err)}))
  },
  sendForm: async (form) => {
  }
}