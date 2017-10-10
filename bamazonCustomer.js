// Running this application will first display all of the items
// available for sale. Include the ids, names, and prices of 
// products for sale.

var sql = require('mysql');
var inquirer = require('inquirer');
var quantArray = ['skip']
var connection = sql.createConnection({
host: 'localhost',
user: 'root',
password: 'sqlpassword',
database: 'bamazon'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM `products`',
	function (error, results, fields) {
		console.log(results);
			for (var i = 0; i < results.length; i++) {
				console.log("ID: " + results[i].item_id, "Product: " + results[i].product_name,
					"Price: $" + results[i].price);
				quantArray.push(results[i].stock_quantity)
			};
			inquireIdQuantity();
	}
);



var inquireIdQuantity = function() {
	inquirer
		.prompt([{
			type: 'input',
			name: 'whatId',
			message: 'Which product Id would you like to buy?',
		},
		{
			type: 'input',
			name: 'whatQuantity',
			message: 'How many units would you like to buy?'
		},
		{
			type: 'confirm',
			name: 'buy',
			message: 'Proceed with purchase?'
		}])
		.then(function(results, err) {
			var id = results.whatId;
			var promptQuantity = results.whatQuantity;
			if (results.buy) {
				quantityCompare(id, promptQuantity);
			} else {
				inquireIdQuantity();
			}
			
		})
}

// FUNCTION
// compares sql quantity to prompt quantity
var quantityCompare = function(id, promptQuantity) {
	console.log(id);
	console.log(promptQuantity);
	console.log(quantArray);

	console.log(quantArray[id]);

	if (quantArray[id] < promptQuantity) {
		console.log('less')
	} else {
		console.log('more')
	}
}