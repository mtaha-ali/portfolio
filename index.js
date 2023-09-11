const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const cors_urls = process.env.CORS_URLS && process.env.CORS_URLS.length > 0 ? process.env.CORS_URLS.split(" ") : ["http://localhost:" + port];

const apiRouter = require("./routes/api.js");
const indexRouter = require("./routes/index.js");

app.use(
  cors({
      origin: cors_urls,
      credentials: true,
  })
);

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/api', apiRouter)
app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});