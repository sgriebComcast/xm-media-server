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


function getImages(req, res) {
    request({
        url: CLOUDINARY_BASE + '?prefix=client/v2/images',
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
        url: CLOUDINARY_BASE + '?prefix=client/v2/icons',
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
        url: CLOUDINARY_BASE + '?prefix=client/v2/illustrations',
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

