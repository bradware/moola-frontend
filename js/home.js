'use strict';

// Wait until DOM loads
$(document).ready(function() {

	$(document).on('click', '#transfer1', function(e) {
		var amount = $('#transfer_field_1')[0].value;
		var newAmount = 12300 - amount;
		transfer(amount);
		$('#sidebar_balance').text("$" + newAmount);
	});

	$(document).on('click', '#transfer2', function(e) {
		transfer();
		var amount = $('#transfer_field_2')[0].value;
		var newAmount = 12300 - amount;
		transfer(amount);
		$('#sidebar_balance').text("$" + newAmount);
	});

	$(document).on('click', '#transfer3', function(e) {
		transfer();
		var amount = $('#transfer_field_3')[0].value;
		var newAmount = 12300 - amount;
		transfer(amount);
		$('#sidebar_balance').text("$" + newAmount);
	});

  var obj = {};
  $.get('https://moola-api-staging.herokuapp.com/tsys/getTransactionData', obj)
    .done(function(res) {
        // sessionStorage.setItem('token', res.header.token);
		var transactions = res['body']['transaction'];

		$("#li11").text((titleCase(transactions[14]['merchant']) + " - " + formatAmount(transactions[14]['amount'])));
		$("#li12").text((titleCase(transactions[11]['merchant']) + " - " + formatAmount(transactions[11]['amount'])));
		$("#li13").text((titleCase(transactions[2]['merchant']) + " - " + formatAmount(transactions[2]['amount'])));
		
		$("#li21").text((titleCase(transactions[4]['merchant']) + " - " + formatAmount(transactions[4]['amount'])));
		$("#li22").text((titleCase(transactions[5]['merchant']) + " - " + formatAmount(transactions[5]['amount'])));
		$("#li23").text((titleCase(transactions[6]['merchant']) + " - " + formatAmount(transactions[6]['amount'])));
		
		$("#li31").text((titleCase(transactions[7]['merchant']) + " - " + formatAmount(transactions[7]['amount'])));
		$("#li32").text((titleCase(transactions[8]['merchant']) + " - " + formatAmount(transactions[8]['amount'])));
		$("#li33").text((titleCase(transactions[13]['merchant']) + " - " + formatAmount(transactions[13]['amount'])));
		
    })	
    .fail(function(error) {
      alert(error.responseText);
    });
});

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
      
   var newStr = splitStr.join(' ');
   
   while(isNumeric(newStr.slice(-1))) {
	   newStr = newStr.substring(0, newStr.length - 1)
   }
   
   if (newStr.length > 14) {
	   newStr = newStr.substring(0,11) + "...";
   }
   
   return newStr;
}

function formatAmount(amount) {
	amount = amount.toString()
	if (amount.indexOf(".") < 0 || amount.substring(amount.indexOf("."), amount.length).length == 1) {
		return "$" + amount + ".00"
	} else if (amount.substring(amount.indexOf("."), amount.length).length == 2) {
		return "$" + amount + "0"
	} else {
		return "$" + amount;
	}
}

function getEarliestTransaction(transactions) {
	var lowestDate = transactions[0]['date'];
	var lowestTran = transactions[0];
	for (var i = 0; i < transactions.length; i++) {
		if (transactions[i]['date'] < lowestDate) {
			lowestDate = transactions[i]['date']
			lowestTran = transactions[i]
		}
	}
	transactions.splice(transactions.indexOf(lowestTran), 1);
	return lowestTran
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

$(document).on('click', '#logout', function(e) {
    $.get('https://moola-api-staging.herokuapp.com/auth/logout_no_headers')
      .done(function(res) {
        //sessionStorage.removeItem('token');
        //document.location.href = 'index.html';
        console.log(res);
      })
      .fail(function(error) {
        alert(error.responseText);
      });
});

$(document).on('click', '#lock_button0', function (e) {
	$('#lock_button0').css("color", "red");
});

$(document).on('click', '#lock_button1', function (e) {
	$('#lock_button1').css("color", "red");
});

$(document).on('click', '#lock_button2', function (e) {
	$('#lock_button2').css("color", "red");
});

function transfer(amount) {
	var options = {
		parent_account: 123456, 
		parent_routing: 222371863,
		child_account:123456,
		child_routing:222371863,
		tran_amount: amount
	}

	if (amount != undefined && amount != 0) {
	
		$.post('https://moola-api-staging.herokuapp.com/trans', options)
		  .done(function(res) {
			alert("Transfer of " + amount + " Dollars Successful");
			
		  })
		  .fail(function(error) {
			alert(error.responseText);
		  });
	}
}