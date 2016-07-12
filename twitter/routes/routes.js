require('./env.js');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

//console.log(process.env.TWITTER_CONSUMER_KEY);

var filterTweets = function(tweets, retweetThreshold) {
  var media = [];     
  for (var i = 0; i < tweets.statuses.length; i++) {
    var tweet = tweets.statuses[i];
    if (tweet.entities.media) {
      media.push({
         "hashtag": tweet.entities.hashtags.map(function(tag) {return tag.text}),
         "timestamp": tweet.created_at,
         "retweetsCount": tweet.retweet_count,
         "favoritesCount": tweet.favorite_count,
         "description": tweet.text,
         "sourceUrl": tweet.entities.media[0].expanded_url,
         "mediaUrl": tweet.entities.media[0].media_url,
         "mediaType": tweet.entities.media[0].type
      });
    }
  }
  return media;
};

var appRouter = function(app) {
  app.get("/search", function(req, res) {
    if (req.query.hashtag) {
      var retweetThreshold = (req.query.retweet_threshold ? parseInt(req.query.retweet_threshold) : 0);
      var tweetsToSearch = (req.query.tweets_to_search ? parseInt(req.query.tweets_to_search) : 100);
      client.get('search/tweets', {q: '%23' + req.query.hashtag, result_type: 'recent', count: '100'}, 
        function(error, tweets, response) {
          res.send({"timeline":  filterTweets(tweets, retweetThreshold), "count": tweetsToSearch});
        });
    }
  });
};
 
module.exports = appRouter;

