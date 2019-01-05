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
    console.log(originUrl);
    console.log(urlPath);
    let shortUrl = shortening(urlPath);
    shortUrl = 'http://localhost/' + shortUrl;
    console.log(shortUrl);
    const params = [originUrl, shortUrl];
    const query = `select shortUrl from urls where originUrl like '${originUrl}'`;
    const query2 = `insert into urls(originUrl, shortUrl) values('${originUrl}', '${shortUrl}')`;
    
    await db.query(query, (err, rows) => {
        console.log('a');
        if (err) throw err;
        else if(rows != 0){
            console.log('b');
            res.send(rows);
            return;
        } else{
            console.log('c');
            db.query(query2, params, (err, result, fields) => {
                if(err) throw err;
            });
            res.send(200);
        }        
    });  
});


app.listen(app.get('port'), () => {
    console.log('Express App on port 3000');
});