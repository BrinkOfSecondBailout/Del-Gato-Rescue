const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    })
    
    const mailOptions = {
        from: request.body.email,
        to: '',
        subject: `Message from ${request.body.email}: ${message.body.reason}`,
        text: `Hello, my name is ${request.body.name}. My phone number is ${request.body.phone}. Address is ${request.body.address}. ${request.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})