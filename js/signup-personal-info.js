'use strict';

// Wait until DOM loads
$(document).ready(function() {
  $(document).on('blur', 'input', function(e) {
    validateDom();
  });

  console.log(localStorage);

  $(document).on('click', '#next', function(e) {
    if (validateUserInfo()) {
      var newUser = createNewUser();
      console.log(newUser);
      $.post('https://moola-api-staging.herokuapp.com/auth/register', newUser)
        .done(function(res) {
          sessionStorage.setItem('token', res.header.token);
          document.location.href = 'home.html';
        })
        .fail(function(error) {
          alert(error.responseText);
        });
    } else {
      document.location.href = 'signup-account.html';
    }
  });
});

function createNewUser() {
  var newUser = {};
  
  // personal
  newUser.first_name = localStorage.getItem('first_name');
  newUser.last_name = localStorage.getItem('last_name');
  newUser.email = localStorage.getItem('email');
  newUser.password = localStorage.getItem('password');
  newUser.date_of_birth = $('#dob')[0].value;
  newUser.phone_number = $('#phone-number')[0].value;

  // address
  newUser.address = {};
  newUser.address.street = $('#street')[0].value;
  newUser.address.city = $('#city')[0].value;
  newUser.address.state = $('#state')[0].value;
  newUser.address.postal_code = $('#postal-code')[0].value;

  // account
  newUser.account = {};
  newUser.account.routing_number = '123456789'; // static data for now
  newUser.account.account_number = '0000000000000'; // static data for now
  newUser.account.ssn4 = $('#ssn')[0].value;

  return newUser;
}

function validateUserInfo() {
  if (localStorage.getItem('first_name') && localStorage.getItem('last_name') 
    && localStorage.getItem('email') && localStorage.getItem('password')) {
    return true;
  } else {
    return false;
  }
}

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