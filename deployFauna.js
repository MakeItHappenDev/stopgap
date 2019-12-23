var fauna = require('faunadb')
var config = require('./env/bootstrap.js')


var q = fauna.query

var server = new fauna.Client({secret:config.key})

const catchMe = function(err){
  console.log(JSON.stringify(err, null, 1))
} 


const runAsync = async () => {

console.log("Creating collection: users")
await server.query(q.CreateCollection({name:'users'})).catch(catchMe)

console.log("Creating collection: ramps")
await server.query(q.CreateCollection({name:"ramps"})).catch(catchMe)

console.log("Creating index: user_by_email")
await server.query(q.CreateIndex({
  name: "user_by_email",
  unique: true,
  serialized: true,
  source: q.Collection("users"),
  terms: [
    {
      field: ["data", "email"]
    }
  ]
})).catch(catchMe)

console.log("Creating index: all_users")
await server.query(q.CreateIndex({
  name: "all_users",
  unique: true,
  serialized: true,
  source: q.Collection("users"),
  terms: []
})).catch(catchMe)

console.log("Creating index: all_ramps")
await server.query(q.CreateIndex({
  name: "all_ramps",
  unique: true,
  serialized: true,
  source: q.Collection("ramps"),
  terms: []
})).catch(catchMe)


console.log("Creating role: loged_admin")
await server.query(q.CreateRole({
  name: "loged_admin",
  privileges: [
    {
      resource: q.Index("all_users"),
      actions: {
        unrestricted_read: false,
        read: true,
        history_read: false
      }
    },
    {
      resource: q.Index("user_by_email"),
      actions: {
        unrestricted_read: false,
        read: false,
        history_read: false
      }
    },
    {
      resource: q.Collection("users"),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: true,
        history_read: false,
        history_write: false
      }
    },
    {
      resource: q.Collection("ramps"),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: true,
        history_read: false,
        history_write: false
      }
    },
    {
      resource: q.Index("all_ramps"),
      actions: {
        unrestricted_read: false,
        read: true,
        history_read: false
      }
    }
  ],
  membership: [
    {
      resource: q.Collection("users"),
      predicate: q.Query(
        q.Lambda("ref", q.Select(["data", "admin"], q.Get(q.Var("ref"))))
      )
    }
  ]
})).catch(catchMe)


console.log("Creating role: Anybody")
await server.query(q.CreateRole({
    name: "Anybody",
    privileges: [
      {
        resource: q.Collection("ramps"),
        actions: {
          read: false,
          write: false,
          create: true,
          delete: false,
          history_read: false,
          history_write: false
        }
      },
      {
        resource: q.Index("user_by_email"),
        actions: {
          unrestricted_read: false,
          read: true,
          history_read: false
        }
      }
    ],
    membership: []
})).catch(catchMe)


console.log(`Creating user ${emailAdmin}, with password:${passwordAdmin}`)
await server.query(
  q.Create(
    q.Collection("users"),
    {
      data:{email:config.email,admin:true},
      credentials:{password:config.password}
    }
  )
)


console.log("Creating key: client for your frontend")
const response = await server.query(q.CreateKey({
  name: "Anybody",
  database: null,
  role: q.Role("Anybody")
})).catch(catchMe)

console.log("/!\\ BEWARE, IMPORTANT KEY AHEAD /!\\")
console.log("YOU NEED TO USE THE FOLLOWING KEY IN YOUR FRONTEND")
console.log("\n")
console.log(response.secret)
console.log("\n")
console.log("/!\\ PUT THIS KEY IN THE FILE env/faunakey.js /!\\")

}
runAsync()
