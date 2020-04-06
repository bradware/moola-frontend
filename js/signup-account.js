'use strict';

// Wait until DOM loads
$(document).ready(function() {
  $(document).on('blur', 'input', function(e) {
    validateDom();
  });

  $(document).on('click', '#next', function(e) {
    localStorage.setItem('first_name', $('#first-name')[0].value);
    localStorage.setItem('last_name', $('#last-name')[0].value);
    localStorage.setItem('email', $('#email')[0].value);
    localStorage.setItem('password', $('#password')[0].value);
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

