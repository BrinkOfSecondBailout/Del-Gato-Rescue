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
    res.send('Hello world');
})

app.post('/contact', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.PASSWORD
        }
    })
    
    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_TO,
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
            user: process.env.EMAIL_FROM,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_TO,
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

app.post('/testimony', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_TO,
        subject: `New review from ${req.body.name}`,
        text: `Congrats! You have a new review from ${req.body.name} phone number: ${req.body.phone} and email: ${req.body.email} and this is what they said: ${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Review submission successful: ' + info.response);
            res.send('success')
        }
    })
})



app.get('/cats', async (req, res) => {
    const accessToken = await generateAccessToken();
    const apiUrl = 'https://api.petfinder.com/v2/animals';
    const organizationId = process.env.ORGANIZATION_ID;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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

// Generate an access token for our API call

let accessTokenData = {
    token: null,
    timestamp: 0,
}

async function generateAccessToken() {
    const currentTime = Math.floor(Date.now() / 1000);

    if (accessTokenData.token && currentTime - accessTokenData.timestamp < 3600) {
        return accessTokenData.token;
    }

    const apiUrl = process.env.API_URL;
    const clientId = process.env.API_KEY;
    const clientSecret  = process.env.SECRET;
    const grantType = 'client_credentials';

    try {
        const response = await axios.post(apiUrl, {
            grant_type: grantType,
            client_id: clientId,
            client_secret: clientSecret ,
        });

        const accessToken = response.data.access_token;
        console.log('pinged');
        // console.log(accessToken);
        return accessToken;
    } catch (error) {
        console.error('Error generating access token:', error.message);
        throw error;
    }
}

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })