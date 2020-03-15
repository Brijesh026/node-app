const users = require('./routes/users');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', users);

app.set('view engine', 'pug');
app.set('views','./views');

require('./startup/prod')(app);

const port = process.env.PORT || 3000;

app.listen(port, () => 
    {
        console.log(`Listening on port ${port}`);
    });