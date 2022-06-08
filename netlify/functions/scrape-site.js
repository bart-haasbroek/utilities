const fetch = require('node-fetch');

function replacePlaceholders(matches, textToReplace) {
	const placeholderMatches = textToReplace.match(/\$[0-9]/g);
    if (!placeholderMatches) {
        return textToReplace;
    }
    const replacedText = placeholderMatches.reduce((prev, curr) => {
        const matchIndex = curr.replace('$', '');
        return prev.replace(curr, matches[matchIndex]);
    }, textToReplace);
    return replacedText;
}
exports.handler = async (event, context) => {
    const {url, regex } = JSON.parse(event.body);
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
    console.log('url', url);
    console.log('regex', JSON.stringify(regex));

    // const url = `https://www.leuk-makelaars.nl/aanbod/woningaanbod/-400000/koop/`;
    const res = await fetch(url);
    const resText = await res.text();

    const nospaceText = resText.replace(/\s\s+/g, ' ');
    const matches = regex.reduce((prev, curr) => {
        const {regex, resultTemplate = '$0', flags } = curr;
        const pattern = !!flags ? new RegExp(regex, flags) : new RegExp(regex);
        const multi = !!flags ? flags.search('g') > -1 : false;

        if (multi) {
            let matches = [...prev.matchAll(pattern)];
            prev = matches.map((match) => {
                return replacePlaceholders(match,resultTemplate);
            });
        } else {
            let match = prev.match(pattern);
            prev = match ? replacePlaceholders(match,resultTemplate) : null;
        }
        return prev;
    }, nospaceText);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow from anywhere
        },
        body: JSON.stringify(matches),
    };
};