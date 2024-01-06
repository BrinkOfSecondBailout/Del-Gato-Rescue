const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const { name, phone, email, message } = JSON.parse(event.body);

    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `New review from ${name}`,
        text: `Congrats! You have a new review from ${name} phone number: ${phone} and email: ${email} and this is what they said: ${message}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Review submission successful:', info.response);
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'success' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error' }),
        };
    }
};