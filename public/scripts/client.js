/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('.error').hide(0);

  $('section.new-tweet').hide(0, function() {
    $(this).attr("showing", "N");
  });

  // handler when new tweets submitted
  $('#submit-tweet').submit(function(event) {
    event.preventDefault();

    $('.error').slideUp("fast", function() {

      // data validation for submitted tweet - no empty tweets or >140 char tweets
      const newTweet = $('#tweet-text').val();
      if (newTweet === "" || newTweet === null) {
        
        $('span.error').html("You didn't Tweet anything! Try humming a different tune.");
        $('.error').slideDown("fast");

      } else if (newTweet.length > 140) {
        
        $('span.error').html("You Tweeted too much! Try humming a shorter tune.");
        $('.error').slideDown("fast");

      } else {
        // submit POST request with serialized data (query string format)
        $.post("/tweets", $(this).serialize())
          .done(function() {
            
            // add the newest tweet card to the top of the tweets container
            $.get("/tweets", function(data) {
              const recentTweet = data[data.length - 1];
              const $newTweet = createTweetElement(recentTweet);
              $('#tweets-container').prepend($newTweet);
            });
          });

        // reformat tweeter text box and counter for next tweet
        $('#tweet-text').val("").focus();
        $('.counter').val(140);

      }
    });
  });

  // display/hide the write tweet form
  $('#nav-right-block span').click(function() {
    
    if ($('section.new-tweet').attr("showing") === "N") {
      $('section.new-tweet')
        .attr("showing", "Y")
        .slideDown();
      
      $('#tweet-text').val("").focus();

    } else {
      $('section.new-tweet')
        .attr("showing", "N")
        .slideUp();
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
      <p>${escapeXSS(tweet.content.text)}</p>
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

// escape function to prevent cross-site scripting
const escapeXSS = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};