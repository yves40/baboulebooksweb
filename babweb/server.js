const express = require('express');

const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
    console.log(`> Starting express server on http://localhost:${port}`);
    const server = express(); 
    server.all('/*path', (req, res) => { 
        return handle(req, res);    
    });
    server.get('/', (req,res) => {
        // res.status(200).send("Hey, You are in my backend!!!");
        res.redirect('/home');
    });
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    }); 
})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
