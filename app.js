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

app.get('/images', getImages.bind(this));
app.get('/icons', getIcons.bind(this));
app.get('/illustrations', getIllustrations.bind(this));
app.get('/search', search);

function search(req, res) {
    debugger;
    var query = new cloudinary.search();
    query.sort_by('created_at', 'desc');
    query.expression('public_id:client/v2/illustrations/*');

    var result = query.execute().then(function(result){
        debugger;
        res.send('asdf');
    });
}

function getImages(req, res) {
    request({
        url: CLOUDINARY_BASE + '?prefix=client/v2/images&max_results=500',
        headers: headers
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
            res.send(error);
            return;
        }
        else {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res.send(body);
        }
    });
};

function getIcons(req, res) {
    request({
        url: CLOUDINARY_BASE + '?prefix=client/v2/icons&max_results=500',
        headers: headers
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
            res.send(error);
            return;
        }
        else {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res.send(body);
        }
    });
};

function getIllustrations(req, res) {
    request({
        url: CLOUDINARY_BASE + '?prefix=client/v2/illustrations&max_results=500',
        headers: headers
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
            res.send(error);
            return;
        }
        else {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res.send(body);
        }
    });
};

