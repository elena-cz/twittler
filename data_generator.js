/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */


// set up data structures
window.streams = {};
streams.home = [];
streams.users = {
  'hermione': {
    'username': 'hermione',
    'fullname': 'Hermione Granger',
    'profilepic': 'hermione.png',
    'stream': []
  },
  'harrypotter': {
    'username': 'harrypotter',
    'fullname': 'Harry Potter',
    'profilepic': 'harry.png',
    'stream': []
  },
  'loveluna': {
    'username': 'loveluna',
    'fullname': 'Luna Lovegood',
    'profilepic': 'luna.png',
    'stream': []
  },
  'ministerofmagic': {
    'username': 'ministerofmagic',
    'fullname': 'Kingsley Shacklebolt',
    'profilepic': 'kingsley.png',
    'stream': []
  },
  'ginny': {
    'username': 'ginny',
    'fullname': 'Ginny Weasley',
    'profilepic': 'ginny.png',
    'stream': []
  },
  'georgeweasley': {
    'username': 'georgeweasley',
    'fullname': 'George Weasley',
    'profilepic': 'george.png',
    'stream': []
  },
  'neville': {
    'username': 'neville',
    'fullname': 'Neville Longbottom',
    'profilepic': 'neville.png',
    'stream': []
  },
  'anonymousowl': {
    'username': 'anonymousowl',
    'fullname': 'Anonymous Owl',
    'profilepic': 'owl.png',
    'stream': []
  }
};

window.users = Object.keys(streams.users).slice(0, -1);


// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].stream.push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'swiftly', 'expertly', 'last night i', 'the minister', 'that wizard', 'a hipogriff', 'a witch', 'a group of muggles'];
var verbs = ['summoned', 'transfigured', 'opened', 'created', 'apparated', 'silenced', 'splinched', 'stupefied', 'swelled', 'managed', 'enchanted', 'enjoyed', 'flew', 'disapparate', 'finished', 'remembered', 'caught', 'exploded', 'ate'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of', 'a bloody'];
var nouns = ['muggle', 'parchment', 'Knight Bus', 'Floo Network', 'Ministry of Magic', 'flying car', 'Hogwarts', 'wand', 'squashy armchairs', 'Daily Prophet', 'quidditch', 'snitch', 'Room of Requirement', 'grindylow', 'Gringotts', 'the Leaky Cauldron'];
var tags = ['#magiclife', '#hogwartsalum', '#muggles', 'but only i know how', 'for real', '#quidditchworldcup', '#mischiefmanaged', '#sodoff', '#dorcus', '#magic', '', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  var now = new Date();
  tweet.user = randomElement(users);
  tweet.name = streams.users[tweet.user].fullname;
  tweet.profilepic = streams.users[tweet.user].profilepic;
  tweet.message = randomMessage();
  tweet.created_at = now.toISOString();
  addTweet(tweet);
};

for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 15000);
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(inputArr){
  var tweet = {};
  var now = new Date();
  tweet.user = inputArr[1].value;
  tweet.message = inputArr[0].value;
  tweet.name = inputArr[2].value;
  tweet.profilepic = inputArr[3].value;
  tweet.created_at = now.toISOString();
  addTweet(tweet);
};
