const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {
    const onlyTitles = event.queryStringParameters.onlyTitles || false;
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
        headless: true,
    });

    const page = await browser.newPage();

    await page.goto('https://www.dailynintendo.nl', { waitUntil: 'networkidle2' });

    const posts = await page.evaluate(() => {
        const items = document.body.querySelectorAll('main .latest-posts-list');
        postItems = [];

        items.forEach((item) => {
            let title = '';
            let summary = '';
            let link = '';
            let image = ''
            try {
                title = item.querySelector('h4').innerText;
                if (title) {
                    summary = item.querySelector('p').innerText;
                    link = item.querySelector('a').href;
                    image = item.querySelector('img').src;
                    postItems.push({
                        title,
                        summary,
                        link,
                        image
                    });
                }
            } catch (e) {

            }
        });
        return postItems;
    });

    await browser.close();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'done',
            posts: posts
        })
    }

}