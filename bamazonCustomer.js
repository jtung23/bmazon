// Running this application will first display all of the items
// available for sale. Include the ids, names, and prices of 
// products for sale.

var sql = require('mysql');
var inquirer = require('inquirer');
var quantArray = ['skip'];
var priceArray = ['skip'];
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
				priceArray.push(results[i].price)
			};
			inquireIdQuantity();
	}
);
// to use callback and use values from inquireidquantity.
// 			inquireIdQuantity(welrkja)
// inquireIdQuantity(function (price) {
/// do sojething with quanitity
// }); 
var inquireIdQuantity = function(callback) {
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
				quantityCompare(id, promptQuantity, removeQuantitySql);
			} else {
				inquireIdQuantity();
				// callback(results.price)
			}
			
		})
}
// updates quantity in database
var removeQuantitySql = function(newQuantity, id, promptQuantity, unitPrice) {
	var totalCost = promptQuantity * unitPrice;

	connection.query("UPDATE products SET stock_quantity='" + newQuantity + "' WHERE item_id='" + id + "'",
		function(error, results) {
			if (error) throw error;
			console.log('Database quantity updated');
			console.log('Your total cost is: $' + totalCost);
		}
	)
}

// FUNCTION
// compares sql quantity to prompt quantity
var quantityCompare = function(id, promptQuantity, callback) {

	if (quantArray[id] < promptQuantity) {
		// quantity less then wanted quantity
		console.log('Insufficient quantity!')
		inquireIdQuantity();
	} else {
		console.log('Purchased!');
		var newQuantity = quantArray[id] - promptQuantity;
		var unitPrice = priceArray[id];
		callback(newQuantity, id, promptQuantity, unitPrice);
	}
}