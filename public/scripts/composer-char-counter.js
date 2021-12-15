// to modify character counter when composing new tweets

$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const charCount = this.value.length; // modify to bind this to use jquery built-in .val()
    
    $('.counter').val(140 - charCount);
    
    // console.log(140 - charCount);
  })
});