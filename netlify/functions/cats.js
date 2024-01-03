const axios = require('axios');

let accessTokenData = {
    token: null,
    timestamp: 0,
};

async function generateAccessToken() {
    const currentTime = Math.floor(Date.now() / 1000);

    if (accessTokenData.token && currentTime - accessTokenData.timestamp < 3600) {
        return accessTokenData.token;
    }

    const apiUrl = process.env.API_URL;
    const clientId = process.env.API_KEY;
    const clientSecret = process.env.SECRET;
    const grantType = 'client_credentials';

    try {
        const response = await axios.post(apiUrl, {
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
        });

        const accessToken = response.data.access_token;
        console.log('Access token generated');
        accessTokenData = {
        token: accessToken,
        timestamp: currentTime,
        };

        return accessToken;
    } catch (error) {
        console.error('Error generating access token:', error.message);
        throw error;
    }
}

exports.handler = async function (event, context) {
    try {
        const accessToken = await generateAccessToken();
        const apiUrl = 'https://api.petfinder.com/v2/animals';
        const organizationId = process.env.ORGANIZATION_ID;

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
        return {
        statusCode: 200,
        body: JSON.stringify(cats),
        };
    } catch (error) {
        console.error('Error fetching cats:', error.message);
        return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};