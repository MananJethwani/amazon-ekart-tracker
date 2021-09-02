const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    url: {
        type: "string",
        required: true,
    },
    emails: [String],
});

const Email = new mongoose.model("Email", EmailSchema);

exports.Email = Email;
