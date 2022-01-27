const express = require('express');

const app = express();


//template engine middleware
app.set("view engine", "ejs");


//json middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/myget', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})



app.listen(4000, () => {
    console.log('server running on port 4000....')
})