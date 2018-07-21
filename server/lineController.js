const request = require('request')

const lineMessageApi = 'https://api.line.me/v2/bot/message'

const thisHttp = 'http://localhost:3001/api/test'

const LINE_HEADER = {
  'Content-Type': 'application/json'
  , 'Authorization': `Bearer ljgFrjtQjtJoyYGAOV0tkocYPQ0dmuv4Omf/zS7PMA6pndI5ZYWowNErdc+Nol9hgmqtAxmbXxdUrlw8JGN/1oLGnG3vUno3teBkexbuswt9/mj2k+5ld91y+G8x4D3Z0fPwiK37VXSQVdq9wC3+RQdB04t89/1O/w1cDnyilFU=`
}

const BODY = {
  "to": ["U4af4980629...","U0c229f96c4..."],
  "messages":[
      {
          "type":"text",
          "text":"Hello, world1"
      },
      {
          "type":"text",
          "text":"Hello, world2"
      }
  ]
}

module.exports = {
  sendMessage: (req, res) => {

    request.post({
      headers: LINE_HEADER
      , uri: thisHttp
      , method: 'POST'
      , json: BODY
    }
  , (err, res, body) => {
    console.log(res)
  })

    res.status(201).send()
  }
  
  , test: (req, res) => {
    res.status(201).send()
  }
}