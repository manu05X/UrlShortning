const express = require("express");
const bodyParser = require("body-parser");
const urlRouter = require("./routes/routes");
const url_Short = require("./model/urlShort");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  console.log("/ has been requested");
  res.send("Hello, world!");
});

app.use(bodyParser.json());
app.use(urlRouter);

setInterval(() => {
  const currTime = Date.now();
  for (const alias in url_Short.urlMap) {
    const urlData = url_Short.urlMap[alias];

    if (urlData.ttl && urlData.created_at + urlData.ttl < currTime) {
      delete url_Short.urlMap[alias];
    }
  }
});

app.get("/model/urlShort/getUrl", (req, res) => {
  console.log("/ has been requested");
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`App listening on port${PORT}`);
});
