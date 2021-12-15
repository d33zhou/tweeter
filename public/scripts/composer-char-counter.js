// to modify character counter when composing new tweets

$(document).ready(function() {
  // update remaining character count on input
  $('#tweet-text').on('input', function() {
    const charCount = this.value.length; // modify to bind this to use jquery built-in .val()
    const remaining = 140 - charCount;

    $('.counter').val(remaining); // should not use the .counter class, use DOM traversal instead
    
    $('.counter').attr("sign", remaining >= 0 ? "positive" : "negative");
  });
});