var fs = require('fs');
var minimist = require('minimist')
var YoutubeMp3Downloader = require('youtube-mp3-downloader');
var request = require('request');

var argv = minimist(process.argv.slice(2));
var songName = (argv._)[0];

var HOST_URL = 'https://www.googleapis.com/youtube/v3/search?';
var params = 'part=snippet&q=%22';
songName = songName + '%22&';
var maxResults = 'maxResults=1';
var order = '&order=viewCount&';
var key = 'key=' + 'AIzaSyB1Q7vtVH8TaLWXpe77ufHc5wpWiKAIgVo';

var REQUEST = HOST_URL + params + songName + maxResults + order + key;

request(REQUEST, function (err, response, body) {
  if (err) throw err;

  var result = JSON.parse(body);
  var firstItem = result.items[0];
  var songId = firstItem.id.videoId;

  var YD = new YoutubeMp3Downloader({
    'ffmpegPath': '/usr/bin/ffmpeg',
    'outputPath': './',
    'youtubeVideoQuality': 'highest',
    'queueParallelism': 2,
    'progressTimeout': 2000
  });

  //Download video and save as MP3 file
  YD.download(songId);

  YD.on('finished', function(err, data) {
    console.log(JSON.stringify(data));
  });

  YD.on('error', function(error) {
    console.log(error);
  });

  YD.on('progress', function(progress) {
    console.log(JSON.stringify(progress));
  });
})

// //Configure YoutubeMp3Downloader with your settings
