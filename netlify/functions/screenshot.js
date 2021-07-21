const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.goto('https://bitsofco.de', { waitUntil: 'networkidle2' });

    const screenshot = await page.screenshot({ encoding: 'base64' });

    await browser.close();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Complete screenshot of https://bitsofco.de`,
            buffer: screenshot
        })
    }

}