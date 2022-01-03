const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const website = event.queryStringParameters.site || '';
    const data = event.queryStringParameters.data || '';
    if (!website || !data) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Missing website and/or data',
                posts: ''
            })
        }
    }
    const response = await fetch(`${website}/wp-json/wp/v2/${data}`);
    const status = response.status;
    if (status === 404) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Deze website is geen wordpress website en de api kan niet gevonden worden',
                posts: ''
            })
        }
    }
    const dataToReturn = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'done',
            data: dataToReturn
        })
    }

}