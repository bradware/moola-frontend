'use strict';

// Wait until DOM loads
$(document).ready(function() {
  var obj = {};
  obj.first_name = 'Dummy';
  obj.last_name = 'User';
  obj.date_of_birth = '12/25/1990';
  obj.email = randomString(5) + '@gmail.com';
  obj.password = '123';
  obj.phone_number = '123-456-7890';

  // address
  obj.address = {};
  obj.address.street = '123 Fake Lake';
  obj.address.city = 'Fakeville';
  obj.address.state = 'CA';
  obj.address.postal_code = '12345';

  // account
  obj.account = {};
  obj.account.routing_number = '123456789';
  obj.account.account_number = '40451234578965';
  obj.account.ssn4 = '1234';

  $.post('https://moola-api-staging.herokuapp.com/auth/register', obj)
    .done(function(res) {
      sessionStorage.setItem('token', res.header.token);
      //$('main')[0].innerText = JSON.stringify(res);
    })
    .fail(function(error) {
      alert(error.responseText);
    });
});

var randomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
