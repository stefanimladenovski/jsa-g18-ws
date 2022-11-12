const express = require('express');

const mailer = require('./handers/mailer');
const config = require('./pkg/config');

const api = express();
api.use(express.json());

api.post('/api/v1/mailer', mailer.sendMail);

api.listen(config.get('service').port, err => {
    if(err) {
      return console.log(err);
    }
    console.log(`SERVER STARTED ON PORT ${config.get('service').port}`)
});