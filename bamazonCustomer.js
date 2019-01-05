var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    itemDisplay();
});

function itemDisplay() {
    // query the database for all items in bamazon stock
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (i = 0; i < results.length; i++) {
            console.log(results[i].item_id + ": " + results[i].product_name +
                ", Price: $" + results[i].price + ", Quantity in Stock: " +
                results[i].stock_quant);
        }
        // prompt the user on what product they want to buy    
        inquirer
            .prompt([
                {
                    name: "products",
                    type: "list",
                    choices: function () {
                        var productArr = [];
                        for (var i = 0; i < results.length; i++) {
                            productArr.push(results[i].product_name);
                        }
                        return productArr;
                    },
                    message: "What product would you like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenProduct;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.products) {
                        chosenProduct = results[i];
                    }
                }
                //determine if there is enough inventory
                if (chosenProduct.stock_quant > parseInt(answer.quantity)) {
                    // there is enough in inventory, so update db, 
                    // let the user know total price, and start over

                    var newQuant = chosenProduct.stock_quant - parseInt(answer.quantity);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quant: newQuant
                            },
                            {
                                item_id: chosenProduct.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("___________________________________________");
                            console.log("Order placed successfully!");
                            console.log("Recipt: Total: $" + (chosenProduct.price * parseInt(answer.quantity)));
                            console.log("___________________________________________");
                            itemDisplay();
                        });
                }
                else {
                    // not enough inventory to place the order
                    console.log("___________________________________________");
                    console.log("There is not enough inventory. Try again...");
                    console.log("___________________________________________");
                    itemDisplay();
                }
            });
    });
}