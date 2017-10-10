// Running this application will first display all of the items
// available for sale. Include the ids, names, and prices of 
// products for sale.

var sql = require('mysql');
var inquirer = require('inquirer');

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
		}])
		.then(function(results, err) {
			console.log(results.whatId);
			console.log(results.whatQuantity);
			return results.whatId;
		})
}