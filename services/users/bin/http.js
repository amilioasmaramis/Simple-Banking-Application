const { connect } = require('../config/mongodb')
const app = require('../app.js')
const port = process.env.PORT || 9001

connect().then(async () => {
  app.listen(port, () => {
    console.log(`Bugdet Server App listening at http://localhost: ${port}`)
  })
})