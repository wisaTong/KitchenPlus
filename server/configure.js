const  bodyParser = require('body-parser')
      , routes = require('./routes')

module.exports = (app) => {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  routes.initialize(app)

  return app
}
