//NPM Modules
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

//Application Modules
const API = require('./api')
const port = 8000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', API)

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`)
})