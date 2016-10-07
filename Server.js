const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, '../zips')));
app.get('/files', function (req, res) {
    "use strict";
    let files = fs.readdirSync('./zips');
    res.send(files);
});

app.listen(9798);