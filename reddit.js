var Snoocore = require('snoocore');
var snoocoreFactory = function(){
  return new Snoocore({
    userAgent: 'User-Agent: node:studio.example:v1.0.0', // unique string identifying the app
	oauth: {
	  type: 'script',
	  key: 'SOME_KEY',
	  secret: 'SOME_SECRET',
	  username: 'SOME_USERNAME',
	  password: 'SOME_PASSWORD',
	  scope: [ 'identity', 'read' ]
	}
  });
};
var reddit = snoocoreFactory();

reddit.on('access_token_expired', function(responseError) {
  console.log('access_token_expired');
  reddit  = snoocoreFactory();
});
module.exports = reddit;