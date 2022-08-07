const { Router } = require("express");
const router = Router();
const { Url } = require('../models/url');
const { Email } = require("../models/email");
const axios = require("axios");
const { parse } = require('node-html-parser');

const urlValueExtractor = async (url) => {
    const { data } = await  axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    const dom = parse(data);
  const price = parseInt(
    (
      dom.querySelector(".a-price-whole") ||
      dom.querySelector(".priceBlockDealPriceString")
    ).innerHTML
      .split(".")[0]
      .split(",")
      .join("")
  );
    return price;
}

const urlNameExtractor = async (url) => {
    const { data } = await  axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    const dom = parse(data);
    let name = dom.querySelector('.product-title-word-break').innerHTML;
    name = name.trim();
    return name;
}

const urlImageExtractor = async (url) => {
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
        }
    })
    const dom = parse(data);
    let imageUrl = dom.querySelector('.a-dynamic-image').getAttribute('src');
    return imageUrl;
}

router.post('/', async (req, res) => {
    const entry = await Url.findOne({url: req.body.url});
    const name = await urlNameExtractor(req.body.url);
    const imageUrl = await urlImageExtractor(req.body.url);
    if(entry) { return res.status(400).send('URL already exsists'); }

    const firstPrice = await urlValueExtractor(req.body.url);
    const values = [firstPrice];
    const dates = [Date.now()];

    const url = new Url({
      name: name,
      url: req.body.url,
      imageUrl: imageUrl,
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
    return res.status(200).send(await Url.find({}));
});

router.get('/', async (req, res) => {
    const data = await Url.find({});
    const result = [];
    data.forEach((data) => {
        const name = data.name;
        const id = data._id;
        const min_value = data.minimum_value;
        let i=0;
        let ans=0;
        data.values.forEach((val) => {
            if(val==min_value) {
                ans=i;
            }
            i++;
        });
        const date = data.dates[ans];
        result.push({
            name,
            id,
            minimum_value: min_value,
            date
        });
    });
    return res.send(result);
});

router.get('/find', async (req, res) => {
    res.send(await Url.findOne({_id: req.query.id}));
});

router.delete('/', async (req, res) => {
    await Url.findOneAndDelete({url: req.body.url});
    await Url.save();
    return res.status(200).send();
});

module.exports = router;
