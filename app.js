const express = require('express');
const path = require('path');
const app = express();
const db = require('./config');
const { shortening } = require('./logic');
const domain = 'http://localhost:3000/'

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'html', 'main.html'));
});

//url shortening
app.get('/shorturl', async (req, res) => {
    
    const origin = req.query.url;
    //console.log(origin);
    const originUrl = new URL(origin).href;
    const { pathname: urlPath } = new URL(origin);
    const query = `select shortUrl from urls where originUrl like '${originUrl}'`;
    
    let data = await db(query);
    let result = data[0] ? data[0].shortUrl : null;
    //console.log(data)
    //console.log(result)
    if(!result){
        let shortUrl = shortening(urlPath);
        shortUrl = domain + shortUrl;
        //console.log(shortUrl)
        const query2 = `insert into urls(originUrl, shortUrl) values('${originUrl}', '${shortUrl}')`;
        await db(query2);
        data = await db(query);
        result = data[0].shortUrl
    }
    res.send(result)
});

//redirect
app.get('/:shortUrl', async (req, res) => {
    let short = req.params.shortUrl;
    short = domain + short;
    const query3 = `select originUrl from urls where shortUrl = '${short}'`;
    const redirectUrl = await db(query3);
    res.redirect(redirectUrl[0].originUrl);
});

app.listen(app.get('port'), () => {
    console.log('Express App on port 3000');
});