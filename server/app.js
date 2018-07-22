const line = require('@line/bot-sdk')
const express = require('express')
const cors = require('cors')

// create LINE SDK config from env variables
const config = {
  channelAccessToken: `ljgFrjtQjtJoyYGAOV0tkocYPQ0dmuv4Omf/zS7PMA6pndI5ZYWowNErdc+Nol9hgmqtAxmbXxdUrlw8JGN/1oLGnG3vUno3teBkexbuswt9/mj2k+5ld91y+G8x4D3Z0fPwiK37VXSQVdq9wC3+RQdB04t89/1O/w1cDnyilFU=`,
  channelSecret: `72ff5b0cf2b7032cd054ab79e0b2d5d4`,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.use(cors())

var ids = []

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    });
});

app.post('/api/push', (req, res) => {
  push()
  res.status(200).send()
})

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const message = { type: 'text', text: `Thank you for subscribe` };

  console.log(event.source.userId)
  ids.push(event.source.userId)

  // use reply API
  return client.replyMessage(event.replyToken, message);
}

function push() {
  const message = { type: 'text', text: 'LPG intensity level is high maybe it is leaking' }
  return client.multicast(ids, message);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
