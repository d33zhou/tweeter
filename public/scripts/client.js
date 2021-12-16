/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // handler when new tweets submitted
  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    
    // data validation for submitted tweet - no empty tweets or >140 char tweets
    const newTweet = $('#tweet-text').val();
    if (newTweet === "" || newTweet === null) {
      alert("Error: You have nothing to Tweet!");
    } else if (newTweet.length > 140) {
      alert("Error: You Tweeted too much!");
    } else {
      // submit POST request with serialized data (query string format)
      $.post("/tweets", $(this).serialize());
      $('#tweet-text').val("").focus();
      $('.counter').val(140);
    }
  });

  // GET all tweets data from server database and generate tweet cards
  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };

  loadTweets();
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
  for (let i = tweets.length - 1; i >= 0; i--) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
  }
};