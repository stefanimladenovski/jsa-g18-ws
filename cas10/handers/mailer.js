const Mailgun = require('mailgun.js');
const formData = require('form-data');
const { Validator } = require('node-input-validator');

const config = require('../pkg/config');
const API_KEY = config.get('mailgun').API_KEY;
const API_DOMAIN = config.get('mailgun').API_DOMAIN;


const sendMail = async (req, res) => {
    try {
        const validator = new Validator(req.body, {
            from: 'required|email',  
            to: 'required|email', 
            subject: 'required|string', 
            html: 'required|string'
        });

        let valid = await validator.check();
        if(!valid) {
            return res.status(400).send('BAD REQUEST')
        }

        const mailgun = new Mailgun(formData);  // instanca
        const mg = mailgun.client( {  
            // sto ke ispratime
            username: 'api',
            key: API_KEY
        });
    
        let out = await mg.messages.create(API_DOMAIN, req.body);

        console.log(out);
    
        res.send('OK');

        // let out = await mg.messages.create(API_DOMAIN, {
        //     //sto ke ispratam
        //     from: 'stefaninelkovska8@gmail.com',  // nasiot mail so sme se registrirale
        //     to: 'stefaninelkovska8@gmail.com',  // nasiot mail so sme se registrirale 
        //     subject: 'TEST MAIL SUBJECT', 
        //     html: '<h1>Test title<h1> <p>Lorem ipsum dolor sit amet .....<p>'
        // });
    } catch (err) {
        console.log(err);
        res.status(500).send('INTERNAL SERVER ERROR');
    }
}



module.exports = {
    sendMail
}

