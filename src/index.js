const puppeteer = require('puppeteer');
const { parse } = require('node-html-parser');

async function valueExtractor(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await browser.close();
    const dom = parse(data);
    const price = parseInt(dom.querySelector('.priceBlockBuyingPriceString').innerHTML.slice(1).split('.')[0].split(',').join(''));
    return price;
}

main();