const request = require('request');
const jsdom = require('jsdom');
const _ = require('lodash');
const async = require('async');
const youtubedl = require('youtube-dl');
const fs = require('fs');
const scrapperPath = process.argv[2] || '';
const path = require('path');


const dir = path.join('zips/', process.argv[3] || Date.now());
const Zip = require('./Zip');
const utubFiles = [];
var mkdirp = require('mkdirp');


if ((!scrapperPath)) {
    console.log('nothing found');
    return;
}

mkdirp(dir, null);
console.log('Fetching url ...');
request.get(scrapperPath, function (err, http, body) {
    if (err) {
        console.log('Its error');
        return;
    }

    console.log('URL Resolved.')
    "use strict";
    jsdom.env(body, [], function (err, window) {
        if (err) {
            console.log('Unable to parse Dom');
            return;
        }

        console.log('Parsing dom..');
        let anchorTags = _.values(window.document.querySelectorAll('a'));
        let youtubeAnchorTags = anchorTags.filter(function (a) {
            return a.getAttribute('href').indexOf('youtube.com') > -1;
        }).map(a => a.getAttribute('href'));

        async.forEachOfSeries(_.take(youtubeAnchorTags, 1),
            function (youtube, index, cb) {
                var video = youtubedl(youtube,

                    // Optional arguments passed to youtube-dl.
                    ['--format=18'],

                    {cwd: __dirname});


                youtubedl.getInfo(youtube, function (err, info) {
                    if (err) {
                        console.log('unable to download vide from ' + youtube);
                        cb();
                    }

                    const downloadedFile = './' + dir + '/' + info._filename;
                    console.log('Downloading...');
                    console.log('id:', info.id);
                    console.log('title:', info.title);
                    console.log('url:', info.url);
                    console.log('thumbnail:', info.thumbnail);
                    console.log('description:', info.description);
                    console.log('filename:', info._filename);
                    console.log('format id:', info.format_id);
                    utubFiles.push(path.join(__dirname, downloadedFile));
                    video.pipe(fs.createWriteStream(downloadedFile));

                });

                video.on('end', function () {
                    console.log('Finished downloading ' + index + '/' + youtubeAnchorTags.length);
                    cb();
                });

            }, function (data) {
                console.log('All files has been downloaded Enjoy!');
            });
    });
})