// General event handlers after page load
$(document).ready(function() {

  // hide error validation, scroll-to-top, and new tweet input form on initial load
  $('#error-validation, #btn-scroll-top, #new-tweet').hide(0);

  // handler when new tweets submitted
  $('#submit-tweet').submit(function(event) {
    event.preventDefault();

    // hide error message if displayed
    $('#error-validation').slideUp("fast");

    // data validation for submitted tweet
    const newTweet = $('#tweet-text');
    const newTweetVal = newTweet.val();
    let errorMsg = "";

    // no empty tweets or >140 char tweets, otherwise add error message
    if (newTweetVal === "" || newTweetVal === null) {
      errorMsg = "You didn't Tweet anything. Time to get creative!";
    } else if (newTweetVal.length > 140) {
      errorMsg = "You Tweeted too much! Try humming a shorter tune.";
    }

    // if error, check that previous error animation finished before pushing new error
    if (errorMsg) {
      $('#error-validation').queue(function() {
        $('span.error').html(errorMsg);
        $('#error-validation').slideDown("fast");
        $(this).dequeue();
      });

      // exit without POST request
      return;
    }
      
    // submit POST request with serialized data (query string format)
    $.post("/tweets", $(this).serialize())
      .done(function() {
        
        // when POST request complete, get & add the new tweet card to the top of the tweets container
        $.get("/tweets", function(data) {
          const recentTweet = data[data.length - 1];
          const $newTweet = createTweetElement(recentTweet);
          $('#tweets-container').prepend($newTweet);
        });
      });

    // reformat tweeter text box and counter for next tweet
    newTweet.val("").focus();
    newTweet.parent().find("output").val(140);
  });

  // display/hide the write tweet form when nav text clicked
  $('#nav-right-block span').click(function() {
    
    const formTweet = $('#new-tweet');

    // if form input hidden, show form, reset counter, and add focus
    if (formTweet.attr("showing") === "N") {
      formTweet
        .attr("showing", "Y")
        .slideDown();
      
      formTweet.find("output").val(140);
      formTweet.find("textarea").val("").focus();

    // if form input showing, hide form
    } else {
      formTweet
        .attr("showing", "N")
        .slideUp();

      // hide error message if displayed
      $('#error-validation').slideUp("fast");
    }
  });

  // display/hide scroll-to-top button when scrolled down, hide/display nav tweet option
  $(window).scroll(function() {

    // show scroll-to-top button when scrolled down more than 50px, hide nav tweet option
    if ($(this).scrollTop() > 50) {
      $('#btn-scroll-top').fadeIn("fast");
      $('#nav-right-block').fadeOut("fast");
    
    // vice versa
    } else {
      $('#btn-scroll-top').fadeOut("fast");
      $('#nav-right-block').fadeIn("fast");
    }
  });

  // button click handling to scroll page back up to top
  $('#btn-scroll-top').click(function() {
    const formTweet = $('#new-tweet');
    
    $('html, body').animate({scrollTop: 0}, 300);

    // display input form and add focus
    formTweet
      .attr("showing", "Y")
      .slideDown();
      
    formTweet.find("output").val(140);
    formTweet.find("textarea").val("").focus();
  });

  // load all tweet cards and display on page
  loadTweets();
});