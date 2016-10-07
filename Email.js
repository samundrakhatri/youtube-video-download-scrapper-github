var api_key = 'key-354d677bde0e6c45534838a5687085f2';
var domain = 'sandboxc74947ae522d4512bb3bbed3ab8b089c.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = function sendMail(message) {
    "use strict";

    var data = {
        from: 'Video has been dowloaded and zipped <samundrak@yahoo.com>',
        to: 'samundra.khatri@introcept.co',
        subject: 'Download Completed',
        text: message || 'Download and Zipped!'
    };

    mailgun.messages().send(data, function (error, body) {
    });
};

