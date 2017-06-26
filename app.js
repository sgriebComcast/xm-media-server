const express = require('express');
const cloudinary = require('cloudinary').v2;
const request = require('request');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const CLOUDINARY_BASE = process.env.CLOUDINARY_BASE;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

cloudinary.config({ 
  cloud_name: 'modesto', 
  api_key: CLOUDINARY_KEY, 
  api_secret: CLOUDINARY_SECRET 
});

let headers = {
    'Authorization': 'Basic ' + new Buffer(CLOUDINARY_KEY + ':' + CLOUDINARY_SECRET).toString('base64'),
    'Content-Type': 'application/json'
};

app.listen(PORT, function () {
    console.log('Xm media server listening on port '+ PORT.toString() +'!');
});

app.get('/search', search);

function search(req, res) {
    if (!req.query.type) {
        res.send('No type provided.');
        return;
    }

    var query = new cloudinary.search();
    query.sort_by('created_at', 'desc');

    //let expression = 'public_id:client/v2/' + req.query.type + '/*';
    let expression = ' public_id:*' + req.query.value + '*';

    if (req.query.value) {
        //expression += ' AND public_id:\"*' + req.query.value + '*\"';
    }

    debugger;
    query.expression(expression);

    var result = query.execute().then(function(result) {
        debugger;
        res.send(result);
    }, function(err) {
        res.send(err);
    });
}

