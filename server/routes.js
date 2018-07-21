const line = require('./lineController')

module.exports.initialize = (app) => {
  
  app.post('/api/alert', line.sendMessage)

}