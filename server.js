// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const logger = require("./logger.js");

app.all(['/', '/test'], (req, res) => {
  let { name, email, number, service } = req.query;
  res.status(200).send({online: true, name, email, number, service});
})

app.all("/email", (req, res) => {
    let { name, email, number, service } = req.query;
  console.log(name, email, number, service);

  var send = require("./email.js");
  send({name, email, number, service})
    .then(val => {
      logger("Email sent successfully", val);
      res.status(200).json({
        sent: true,
        response: val
      });
    })
    .catch(reason => {
      logger("Email failed to send", reason);
      res.status(200).json({
        sent: false,
        reason
      });
    });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
