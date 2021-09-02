const { Router } = require('express');
const router = Router();
const { Email } = require("../models/email");

router.post('/', async (req, res) => {
    const list = await Email.findOne({url: req.body.url});
    if (!list) {
        return res.status(400).send('Product not added yet');
    }
    if (list.emails.includes(req.body.email)) {
        return res.status(400).send('email already added');
    }
    
    const emails = [...list.emails, req.body.email];
    await Email.findOneAndUpdate({url: req.body.url}, {emails: emails});
    return res.status(200).send();
});

module.exports = router;