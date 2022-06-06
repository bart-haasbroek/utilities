const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const email = event.queryStringParameters.email || '';
    if (!email) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow from anywhere
            },
            body: JSON.stringify('error'),
        };
    }
    const data = {
        table: 'appxqU5ffBWW19BOJ/emails',
        fields: {
            'email': email
        }
    }

    const url = `https://api.airtable.com/v0/${data.table}`;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                fields: data.fields
            }),
            headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${apiKey}` }
    })
    const status = await res.json();
    if (status['error']) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow from anywhere
            },
            body: JSON.stringify('error'),
        };
    }
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow from anywhere
        },
        body: JSON.stringify('success'),
    };
};