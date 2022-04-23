//main JS starts API
const express = require("express");
const app = express();

app.use(express.static('public'));

const port = 4000;
app.listen(port, function (){
    console.log('Server started at http://localhost:%s', port);
});