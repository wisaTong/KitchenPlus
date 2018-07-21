const express = require("express");
const config = require("./configure");

let app = express();

const port = process.env.PORT || 3001;

app = config(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
