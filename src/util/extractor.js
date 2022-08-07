const puppeteer = require('puppeteer');
const { parse } = require('node-html-parser');
let browser;
let page;

const ini = async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
}

const urlNameExtractor = async (url) => {
    await page.goto(url);
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const dom = parse(data);
    let name = dom.querySelector('.product-title-word-break').innerHTML;
    name = name.trim();
    return name;
}

const urlValueExtractor = async (url) => {
    await page.goto(url);
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const dom = parse(data);
  const price = parseInt(
    (
      dom.querySelector(".a-price-whole") ||
      dom.querySelector(".priceBlockDealPriceString")
    ).innerHTML
      .slice(1)
      .split(".")[0]
      .split(",")
      .join("")
  );
    return price;
}

const close = async () => {
    await browser.close();
}

exports.ini = ini;
exports.urlNameExtractor = urlNameExtractor;
exports.urlValueExtractor = urlValueExtractor;
exports.close = close;