const express = require('express');
const path = require('path');

const app = express();
const db = require('./config');
const { shortening } = require('./logic');

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'html', 'main.html'));
});

app.get('/shorturl', async (req, res) => {
    const origin = req.query.url;
    let originUrl = new URL(origin).href;
    const { pathname: urlPath } = new URL(origin);
    //const { host: urlHost } = originUrl;
    //originUrl = urlHost + urlPath;
    const query = `select shortUrl from urls where originUrl like '${originUrl}'`;
    
    const data = await db(query);
    console.log(originUrl)
    console.log(data)
    let result = data[0] ? data[0].shortUrl : null;

    if(!result){
        let shortUrl = shortening(urlPath);
        shortUrl = 'http://localhost/' + shortUrl;
        const query2 = `insert into urls(originUrl, shortUrl) values('${originUrl}', '${shortUrl}')`;
        await db(query2);
        result = await db(query)[0].shortUrl;    
    }
    console.log(result)
    res.send(result);
        
});


app.listen(app.get('port'), () => {
    console.log('Express App on port 3000');
});