const express = require("express")
const server = express()




server.use(express.static('public'))

server.use(express.urlencoded({extended: true}))

const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  password: '123', 
  host:'localhost',
  port: 5432,
  database: 'doe'
})

const nunjucks = require("nunjucks")
nunjucks.configure("./", {
  express: server,
  noCache: false
})


server.get("/", function(req, res) {
  const donors = []
  return res.render("public/views/index.html", {donors})

})

server.post("/", function(req, res){
  const name = req.body.name
  const email = req.body.email
  const blood = req.body.blood


  if (name == "" || email == "" || blood == ""){
    return res.send("Todos os campos devem ser preenchidos!")


  }

  const query = `INSERT INTO donors ("name", "email", "blood") 
  VALUES ($1, $3, $3)`

  const values = [name, email, blood]

  db.query(query, values, function(err){
    if(err) return res.send("erro no banco de dados.")

    return res.redirect("/")
  })
})


server.listen(3000, function() {
  console.log("iniciei o server")


})
