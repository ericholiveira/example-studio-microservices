var studio = require('studio');
var studioCluster = require('studio-cluster');
studio.use(studioCluster({rpcPort:8001}));
studio.use(studio.plugin.timer(function(res){
	console.log(res);
}));
studio.use(studio.plugin.retry);

require('./express');
require('./reddit_service');
