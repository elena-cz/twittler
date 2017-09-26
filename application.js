// FUNCTIONS


var generateTweetHTML = function(stream) {
    var numTweets = stream.length;
    while (index < numTweets) {
      var tweet = stream[index];
      var $tweet = $('<article class="tweet group"><div class="profilepic"></div><div class="info"></div><div class="message"></div></article>');
        $tweet.find('.profilepic').append('<img src="assets/profile_pics/' + tweet.profilepic + '"/>');
        $tweet.find('.info').append('<span class="name"><a>' + tweet.name + '</a></span>');
        $tweet.find('.info').append('<span class="username" data-username="' + tweet.user + '"><a>' + '@' + tweet.user + '</a></span>');
        $tweet.find('.info').append('<span class="time" data-time-created="' + tweet.created_at + '""> - ' + ' ' + moment(tweet.created_at).twitterLong() + '</span>');
        $tweet.find('.message').append('<p>' + tweet.message + '</p>');
        $tweet.prependTo($('.feed'));
      index++; 
    } 
  };

var loadHomeTweets = function() {
  currentFeed = 'home'
  $('.feed').empty();
  index = 0;
  generateTweetHTML(streams.home);

  $('.writetweet').removeClass('hide');

  var username = 'anonymousowl';
  $('.profile').find('.name').text(streams.users[username].fullname);
  $('.profile').find('.username').text('@' + username);
  $('.profile').find('.profilepic').html('<img src="assets/profile_pics/' + streams.users[username].profilepic + '"/>');
};

var loadUserTweets = function() {
  var username = $(this).closest('.tweet').find('.username').data('username');
  currentFeed = username;
  $('.feed').empty();
  index = 0;
  generateTweetHTML(streams.users[username].stream);

  $('.writetweet').addClass('hide');

  $('.profile').find('.name').text(streams.users[username].fullname);
  $('.profile').find('.username').text('@' + username);
  $('.profile').find('.profilepic').html('<img src="assets/profile_pics/' + streams.users[username].profilepic + '"/>');
};

var updateTime = function() {
  var tweetTime = $(this).closest('.time').data('time-created');
  $('.feed').find('.time').each(function() {
    var tweetTime = $(this).data('time-created');
    $(this).text(' - ' + moment(tweetTime).twitterLong());
  });
};


var updateNumNewTweets = function() {
  var numNewTweets = 0;
  if (currentFeed === 'home') {
    numNewTweets = streams.home.length - index;
  } else {
    numNewTweets = streams.users[currentFeed].stream.length - index;
  }
  if (numNewTweets > 0) {
    $('.showtweets').slideDown(300);
    if (numNewTweets === 1) {
      $('.showtweets').text('Show 1 new post');
    } else {
      $('.showtweets').text('Show ' + numNewTweets + ' new posts');
    }
  }
  
};

var showNewTweets = function() {
  if (currentFeed === 'home') {
    generateTweetHTML(streams.home);
  } else {
    generateTweetHTML(streams.users[currentFeed].stream); 
  }
  $('.showtweets').slideUp(300);
};


// JQUERY EVENTS

$(document).ready(function(){

  loadHomeTweets();

  $('.showtweets').on('click', showNewTweets);

  $('.feed').on('click', '.name', loadUserTweets);
  $('.feed').on('click', '.username', loadUserTweets);
  $('.home').on('click', loadHomeTweets);
  $( ".writetweet" ).submit(function(event) {
    writeTweet($(this).serializeArray());
    event.preventDefault();
    showNewTweets();
    $('.writetweet').trigger('reset');
  });

  setInterval(updateTime, 5000);
  setInterval(updateNumNewTweets, 1000);


});




