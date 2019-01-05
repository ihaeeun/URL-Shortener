const crypto = require('crypto');

module.exports = {
    shortening : (urlPath) => {
        return hash = crypto.createHash("sha1").update(urlPath).digest('base64').substring(0,8);
    }
}

//shortening();
