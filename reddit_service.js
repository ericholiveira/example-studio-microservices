"use strict";
var Studio = require('studio');
var reddit = require('./reddit');

var youtubeModule = Studio.module('Youtube');
var fetchFromYoutube = youtubeModule('fetch');
class Reddit{
	fetchSubreddit(path){
		return reddit('/r/videos/'+path).get();	
	}
	* searchForContent(path){
		var redditResponse = yield this.fetchSubreddit(path);
		var redditVideoInfo = redditResponse.data.children;
		
		var fetchPromises = redditVideoInfo.map((info)=>fetchFromYoutube(info.data.url));
		
		var videosInfo = yield fetchPromises;

		return videosInfo.filter((info)=> info!==null);
		
	}
}
var serviceObj = Studio.serviceClass(Reddit);
serviceObj.searchForContent.retry(1)