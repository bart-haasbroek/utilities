exports.handler = async (event, context) => {
    const name = event.queryStringParameters.name || "World";
    const allCaps = `Hello, ${name}`.toUpperCase();
    return {
        statusCode: 200,
        body: allCaps,
    };
};