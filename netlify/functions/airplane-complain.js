const chromium = require('chrome-aws-lambda');

function makeTwoNumbers(number) {
    if (number < 10) {
        number = '0' + number;
    }
    return number;
}

function getNowTime() {
    const current = new Date();
    const hours = makeTwoNumbers(current.getHours());
    const minutes = makeTwoNumbers(current.getMinutes());
    return `${hours}:${minutes}`
}

function getTodayDate() {
    var today = new Date();
    var dd = makeTwoNumbers(today.getDate());
    var mm = makeTwoNumbers(today.getMonth() + 1);
    var yyyy = today.getFullYear();
    return `${dd}-${mm}`;
}

exports.handler = async (event, context) => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();
    const currentDate = getTodayDate();
    const currentTime = getNowTime();

    await page.goto('https://meldingen-bezoekbas.nl/', { waitUntil: 'networkidle2' });
    //login
    await page.type('#input_email', 'haasbroek_89@hotmail.com');
    await page.type('#input_password', '2!!#D9ojziXe*s&c');
    await page.click('#login.btn');
    await page.waitForNavigation();
    //end login
    await page.click('#form-1 .custom-control:nth-child(1) .custom-control-label');
    await page.waitForTimeout(300);
    await page.click('#c1_next');
    await page.waitForNavigation();
    //end step 1
    await page.click('#form-2 .custom-control:nth-child(1) .custom-control-label');
    await page.waitForTimeout(300);
    await page.click('#c2_next');
    await page.waitForNavigation();
    // end step 2
    await page.waitForTimeout(300);

    await page.type('#date', currentDate);
    await page.waitForTimeout(300);
    await page.type('#time', currentTime);
    await page.waitForTimeout(200);
    await page.click('#cs_next');
    await page.waitForNavigation();
    //end step 3
    await page.waitForTimeout(300);
    await setSelectVal('#cause', '7');

    async function setSelectVal(sel, val) {
        page.evaluate((data) => {
            return document.querySelector(data.sel).value = data.val
        }, { sel, val })
    }

    const screenshot = await page.screenshot({ encoding: 'base64' });

    await browser.close();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Gelukt!`,
            buffer: screenshot
        })
    }

}