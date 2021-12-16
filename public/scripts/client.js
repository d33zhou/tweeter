/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // generate and display tweet cards from database
  renderTweets(data);

  // handler when new tweets submitted
  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    
    // submit POST request with serialized data (query string format)
    $.post("/tweets", $(this).serialize());
    
    // console.log($(this).serialize());

  });
});



// --------------------------------------------------
// HELPER FUNCTIONS ---------------------------------
// --------------------------------------------------

// generate the dynamic article element, to be added to the DOM
const createTweetElement = function(tweet) {
  return $(`<article class="tweet">
    <header>
      <p class="pic-name"><img src=${tweet.user.avatars}> ${tweet.user.name}</p>
      <p class="handle">${tweet.user.handle}</p>
    </header>
    <div class="content">
      <p>${tweet.content.text}</p>
    </div>
    <footer>
      <p>${timeago.format(tweet.created_at)}</p>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
  <br>`);
};

// loop through each tweet data element, to generate each tweet for DOM
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

// DATABASE -------------------------------------------

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]