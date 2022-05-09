require('dotenv').config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: "charlieanderson2001@gmail.com", 
    from: "charlieanderson2001@gmail.com", 
    subject: "Testing verification email", 
    text: "Example of verification email text", 
    html: "<strong>Html example</strong>"
};
sgMail.send(msg);
