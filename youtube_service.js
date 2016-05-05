"use strict";
var Studio = require('studio');
var request = require('request');

var YOUTUBE_KEY = 'SOME_YOUTUBE_KEY';
var YOUTUBE_REGEX = /https:\/\/www.youtube.com\/watch\?v=(\w*)/;
var youtubeModule = Studio.module('Youtube');

youtubeModule(function * fetch(url){
	var match = YOUTUBE_REGEX.exec(url);
	if(match && match[1]){
		let id = match[1];
		let youtubeResponse = yield request(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${YOUTUBE_KEY}`, Studio.defer());
		let body = JSON.parse(youtubeResponse.body);
		let itemsResult = body.items;
		if(itemsResult && itemsResult.length>0){
			let info = itemsResult[0];
			return {
				title:info.snippet.title,
				description:info.snippet.description
			};
		}
	}
	return null;
});