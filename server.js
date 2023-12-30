const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios'); 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/contact', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    
    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: `Message from ${req.body.email}: ${req.body.reason}`,
        text: `Hello, my name is ${req.body.name}. My phone number is ${req.body.phone}. My location is ${req.body.address}. ${req.body.message}`
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

app.post('/subscribe', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: `New subscription from ${req.body.email}`,
        text: `Congrats! You have a new subscription from ${req.body.email}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Subscription successful: ' + info.response);
            res.send('success')
        }
    })

})



app.get('/cats', async (req, res) => {
    const apiKey = process.env.ACCESS_TOKEN;
    const apiUrl = 'https://api.petfinder.com/v2/animals';
    const organizationId = process.env.ORGANIZATION_ID;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            params: {
                type: 'cat',
                organization: organizationId,
            },
        });

        const cats = response.data.animals;
        // console.log(cats)
        res.json(cats);
    } catch (error) {
        console.error('Error fetching cats:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})