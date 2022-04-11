const express = require("express");
const app = express();

app.use(express.static('public'));

app.use('/css', express.static(__dirname = '/public/css'));
app.use('/js', express.static(__dirname = '/public/src'));

const port = 4000;
app.listen(port, function (){
    console.log('Server started at http://localhost:%s', port);
});