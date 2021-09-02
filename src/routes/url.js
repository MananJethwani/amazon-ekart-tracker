const { Router } = require("express");
const router = Router();
const { Url } = require('../models/url');
const { Email } = require("../models/email");
const {ini, urlNameExtractor, urlValueExtractor, close} = require("../util/extractor");

router.post('/', async (req, res) => {
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

    const emails = new Email({
        url: req.body.url,
        emails: []
    });

    await url.save();
    await emails.save();
    await close();
    return res.status(200).send(await Url.find({}));
});

router.get('/', async (req, res) => {
    return res.send(await Url.find({}));
});

router.delete('/', async (req, res) => {
    await Url.findOneAndDelete({url: req.body.url});
    await Url.save();
    return res.status(200).send();
});

module.exports = router;
