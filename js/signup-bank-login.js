'use strict';

// Wait until DOM loads
$(document).ready(function() {
  $(document).on('blur', 'input', function(e) {
    validateDom();
  });
});

function validateDom() {
  var inputs = $('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length === 0) {
      $('#next').prop('disabled', true);
      return;
    }
  }
  $('#next').prop('disabled', false);
}