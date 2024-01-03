const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async function (event, context) {
    try {
        const requestBody = JSON.parse(event.body);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: requestBody.email,
            to: process.env.EMAIL,
            subject: `New subscription from ${requestBody.email}`,
            text: `Congrats! You have a new subscription from ${requestBody.email}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Subscription successful: ' + info.response);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'success' }),
        };
    } catch (error) {
        console.log('hi')
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'error' }),
        };
    }
};