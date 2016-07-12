require('./env.js');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

var filterTweets = function(tweets, retweetThreshold) {
  var media = [];     
  for (var i = 0; i < tweets.statuses.length; i++) {
    var tweet = tweets.statuses[i];
    if (tweet.entities.media) {
      media.push({
         "id": tweet.entities.media[0].id_str,
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

var groupTweets = function(tweets) {
  var groups = {};
  tweets.map(function(tweet) {
    var ts = new Date(Date.parse(tweet.timestamp));
    var key = ts.getYear() + '-' + ts.getMonth() + '-' + ts.getDay() + '-' + ts.getHours(); // + '-' + ts.getMinutes();
    if (groups[key] === undefined) {
      groups[key] = [];
    }
    groups[key].push(tweet);
  });
  //Math.max(timestamps) - Math.min(timestamps)
  return groups;
};

var toJson = function(groupedTweets) {
  var rows = [];
  for (var key in groupedTweets) {
    rows.push({"heading": key, "media": groupedTweets[key]});
  }
  return rows;
};

var appRouter = function(app) {
  app.get("/search", function(req, res) {
    if (req.query.hashtag) {
      var retweetThreshold = (req.query.retweet_threshold ? parseInt(req.query.retweet_threshold) : 0);
      var tweetsToSearch = (req.query.tweets_to_search ? parseInt(req.query.tweets_to_search) : 100);
      client.get('search/tweets', {q: '%23' + req.query.hashtag, result_type: 'popular', count: '100'}, 
        function(error, tweets, response) {
          var filteredTweets = filterTweets(tweets, retweetThreshold);
          var groupedTweets = groupTweets(filteredTweets);
          var json = toJson(groupedTweets);
          res.send({"rows": json, "count": tweetsToSearch});
        });
    }
  });
};
 
module.exports = appRouter;

