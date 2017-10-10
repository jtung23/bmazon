
var sql = require('mysql');
var inquirer = require('inquirer');

var choiceArr = ["View Products for Sale", "View Low Inventory", 
									"Add to Inventory", "Add New Product"]

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

inquirer
	.prompt({
		type: "list",
		name: "menu",
		message: "Menu",
		choices: choiceArr
	})
	.then(function(results, error) {
		if (error) throw error;

		switch (results.menu) {
			case choiceArr[0]:
				console.log('0');
				viewProducts();
				break;
			case choiceArr[1]:
				console.log('1');
				viewLow();
				break;
			case choiceArr[2]:
				console.log('2');
				addInventory();
				break;
			case choiceArr[3]:
				console.log('3');
				addProduct();
				break;
		}
	})
// list every available item: the item IDs, names, prices, and quantities.
var viewProducts = function() {
	connection.query("SELECT * FROM `products`", function(error, results, fields) {
		for (var i = 0; i < results.length; i++) {
			console.log("\nItem Id: " + results[i].item_id + 
									"\nProduct Name: " + results[i].product_name + 
									"\nPrice: " + results[i].price + 
									"\nQuantity: " + results[i].stock_quantity)
		}
	})
}

var viewLow = function() {
	connection.query("SELECT * FROM `products` WHERE stock_quantity<5", 
	function(error, results) {
		for (var i = 0; i < results.length; i++) {
			console.log("\nItem Id: " + results[i].item_id + 
									"\nProduct Name: " + results[i].product_name + 
									"\nPrice: " + results[i].price + 
									"\nQuantity: " + results[i].stock_quantity)
		}
	});
}

// display a prompt that will let the manager "add more"
// of any item currently in the store. 
var addInventory = function() {
	inquirer
		.prompt()
}

var addProduct = function() {

}