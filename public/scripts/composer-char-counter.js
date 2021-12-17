// Modify remaining character count on user input
$(document).ready(function() {
  // update remaining character count on input
  $('#tweet-text').on('input', function() {
    const field = $(this);
    const output = field.parent().find("output");
    
    // calc remaining count - 140 chars is set limit
    const remaining = 140 - field.val().length;

    // update character counter for remaining count and attribute (for color styling)
    output
      .val(remaining)
      .attr("sign", remaining >= 0 ? "positive" : "negative");
  });
});