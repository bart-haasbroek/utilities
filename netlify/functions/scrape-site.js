const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const {url, regex } = JSON.parse(event.body);
    console.log('params', url, regex);

    if (!regex) {
        return {
            statusCode: 400,
            body: JSON.stringify('regex is required but undefined'),
        };
    }
    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify('url is required but undefined'),
        };
    }
    // const regex2 = event.queryStringParameters.regex || '';
    // const regex = new RegExp(regex2, 'g');
    // console.log('url', url);

    // const regexes = [
    //     {
    //         regex: '<main .*?>.*?<\/main>',
    //     },
    //     {
    //         regex: '<h4> (<a.*?>(.*?)<\/a>)',
    //         getGroup: 2,
    //         flags: 'g',
    //     },
    //     // {
    //     //     regex: '<h4> (<a.*?>(.*?)<\/a>)',
    //     //     getGroup: 2,
    //     //     flags: 'g',
    //     // },
    // ]
    // console.log('regex', regex);
    // const url = `https://www.leuk-makelaars.nl/aanbod/woningaanbod/-400000/koop/`;
    // const url = 'https://www.dailynintendo.nl/';
    const res = await fetch(url);
    const resText = await res.text();
    const nospaceText = resText.replace(/\s\s+/g, ' ');
    const matches = regex.reduce((prev, curr) => {
        const {regex, getGroup = 0, flags } = curr;
        const pattern = !!flags ? new RegExp(regex, flags) : new RegExp(regex);
        const multi = !!flags ? flags.search('g') > -1 : false;

        if (multi) {
            let matches = [...prev.matchAll(pattern)];
            prev = matches.map((match) => {
                return match[getGroup];
            });
        } else {
            let match = prev.match(pattern);
            prev = match ? match[getGroup] : null;
        }

        // if (groupMatch) {
        //     let match = prev.match(pattern);
        //     prev = match[0];
        // } else {
        //     let matches = [...prev.matchAll(pattern)];
        //     prev = matches[groupMatch]
        // }
        // console.log('typeof prev', typeof prev, Array.isArray(prev));
        // console.log('PREEEEEEEVVV!!!', prev);
        return prev;
    }, nospaceText);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow from anywhere
        },
        body: JSON.stringify(matches),
    };

    const first = /<main .*?>.*?<\/main>/;
    const test = nospaceText.match(first);
    console.log('test', test);

    // const regex = /<<span .*>([0-9]+)[\w\s].*<sup.*?>([0-9-]+)>/;
    // const regex = /<h4>(<a.*?>(.*?)<\/a>)/g;
    let array = [...test[0].matchAll(regex)];
        const match = nospaceText.match(regex);
        // console.log('match', match);

        const list = array.map((match) => {
            return match[2];
        })
    // console.log('match', match);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow from anywhere
        },
        body: JSON.stringify(list),
    };
};