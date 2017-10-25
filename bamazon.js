var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Funky123!",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    // asynchronous error check function
    if (err) throw err;
    // function call to start the database and sales system after the database connection has been established
    start();
});

// function to start the database and sales system
function start() {
    console.log("Bamazon is pleaesed to offer the following items for your literary enjoyment:");
    // function call to console.log the database contents
    databaseConsole();
    // function call to offer user purchase options
}

// function to display database contents to user
function databaseConsole() {
    connection.query(
        "SELECT item_id, product_name, customer_price FROM products",
        function(err, results) {
            // asynchronous error check function
            if (err) throw err;
            console.log(results);
        });
    userChoice();
}

// function to offer user purchase options
function userChoice() {
    console.log("Input the ID number of the item you would like to purchase or enter -99 to quit.")
    inquirer.prompt([{
        type: "input",
        name: "userIDInput",
        message: ">>",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(user) {
        var choice = user.userIDInput;
        numberSearch(choice);
    });
}

function numberSearch(itemSearch) {
    if (itemSearch > -99) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: itemSearch }, function(err, res) {
            userPurchase = res;
            if (res[0].stock_quantity === 0) {
                console.log("None available.  Choose another product.");
                userChoice();
            } else {
                console.log(userPurchase);
                userQuantity(userPurchase);
            }
        });
    } else { process.exit(1); }
}

function userQuantity(userPurchase) {
    console.log("Input the quantity to  purchase.");
    inquirer.prompt([{
        type: "input",
        name: "userQuantityInput",
        message: ">>",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(user) {
        var choice = user.userQuantityInput;
    });
    if (choice > userPurchase[0].stock_quantity) {
        console.log("Insufficient Quantity.");
        userChoice();
    } else {
        var quantitytoDB = userPurchase[0].stock_quantity - choice;
        connection.query(
            "UPDATE products SET quantitytoDB WHERE userPurchase[0].stock_quantity",
            function(err, results) {
                if (err) throw err;
                console.log("Congratulations!");
                var totalCost = userQuantityChoice * userPurchase[0].customer_price;
                console.log("Your cost is $" + totalCost);
            });
    }
    start();
}