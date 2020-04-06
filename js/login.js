'use strict';

// Wait until DOM loads
$(document).ready(function() {
  $(document).on('blur', 'input', function(e) {
    validateDom();
  });

  $(document).on('click', '#login', function(e) {
    var user = {};
    user.email = $('#email')[0].value;
    user.password = $('#password')[0].value;

    $.post('http://moola-api-staging.herokuapp.com/auth/login', obj)
      .done(function(res) {
        sessionStorage.setItem('token', res.header.token);
        document.location.href = 'home.html';
      })
      .fail(function(error) {
        alert(error.responseText);
      });
  });
});



function validateDom() {
  var inputs = $('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length === 0) {
      $('#login').prop('disabled', true);
      return;
    }
  }
  $('#login').prop('disabled', false);
}

