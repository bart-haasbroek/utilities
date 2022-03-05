const fetch = require('node-fetch');
function makePrice(number, number2) {
    number2 = number2.replace('-', '00');
    return number + ',' + number2;
}
exports.handler = async (event, context) => {
    const urls = [
        'https://www.bol.com/nl/nl/p/super-mario-3d-world-bowser-s-fury-switch/9300000009410369/?bltgh=hl-AJxuCI24WyyCau1JAQw.2_36.38.ProductImage',
        'https://www.bol.com/nl/nl/p/nintendo-switch-console-blauw-rood/9200000073683930/?bltgh=n0SIhfhUiaWFggDS7hFL-Q.2_34.35.ProductImage',
        'https://www.bol.com/nl/nl/p/kobo-clara-hd-e-reader-hoge-resolutie-display-van-6-inch-8-gb-wifi-zwart/9200000092865871/?bltgh=iFa3NYf7DPaRTmg-wRxH7Q.2_36.37.ProductImage'
    ];
    const responses = await Promise.all(urls.map(async url => {
        const resp = await fetch(url);
        return resp.text();
    }));
    const prices = responses.map((res) => {
        const regex = /<span .*>([0-9]+)[\w\s].*<sup.*?>([0-9-]+)/;
        const match = res.match(regex);
        const price = match ? makePrice(match[1], match[2]) : null;
        return price;
    });
    console.log('prices', prices);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow from anywhere
        },
        body: JSON.stringify(prices),
    };


    // const allCaps = `Hello, ${name}`.toUpperCase();
    // return {
    //     statusCode: 200,
    //     headers: {
    //         "Access-Control-Allow-Origin": "*", // Allow from anywhere
    //     },
    //     body: allCaps,
    // };
};