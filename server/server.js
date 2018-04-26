const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;

const config = require('./config');
const routes = require('./routes');
const app = express();

if (typeof localStorage === "undefined" || localStorage === null) {
  localStorage = new LocalStorage('./scratch');
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: config.whitelist }));

app.use(config.apiPrefix, routes);
app.get("/", (req, res) => res.json({ message: "Welcome to the Accounting System !" }));

app.listen(PORT, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening on ${ PORT }`)
});

module.exports = app;

