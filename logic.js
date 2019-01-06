const crypto = require('crypto');
const timestamp = new Date().getTime();
module.exports = {
    shortening : (urlPath) => {
        return hash = crypto.createHash("sha1").update(urlPath).digest('base64').substring(0,8);
    }    
}