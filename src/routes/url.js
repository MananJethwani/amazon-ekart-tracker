const { Router } = require("express");
const router = Router();
const { Url } = require('../models/url');
const {ini, urlNameExtractor, urlValueExtractor, close} = require("../util/extractor");

router.post('/', async (req, res) => {
    // browser = await puppeteer.launch();
    // page = await browser.newPage();
    await ini();
    const entry = await Url.findOne({url: req.body.url});
    const name = await urlNameExtractor(req.body.url);
    if(entry) { return res.status(400).send('URL already exsists'); }

    const firstPrice = await urlValueExtractor(req.body.url);
    const values = [firstPrice];
    const dates = [Date.now()];

    const url = new Url({
      name: name,
      url: req.body.url,
      values: values,
      dates: dates,
      created_at: Date.now(),
      minimum_value: firstPrice
    });

    await url.save();
    await close();
    return res.status(200).send(await Url.find({}));
});

router.get('/', async (req, res) => {
    return res.send(await Url.find({}));
});

router.delete('/', async (req, res) => {
    await Url.findOneAndDelete({url: req.body.url});
    return res.status(200).send();
});

module.exports = router;
