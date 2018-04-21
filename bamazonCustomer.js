var mysql = require("mysql");
//requiring inquirer which will be used to call up the prompt
var inquirer = require("inquirer");
//create connection to MySql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "buffman23",
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as ID: " + connection.threadId);
    qureyAllProducts();
})
//create function which displays all data from MySql databas(item id, product name, department name, price, stock quantity)
function qureyAllProducts() {
    connection.query("select * from products", function(err,res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "|" +"Item: "+ res[i].product_name + "|" +"Department: " + res[i].department_name + "|" + "Price: " + res[i].price + "|" + "Quantity: " + res[i].stock_quantity + "\n")
        }
       userPurchase()
    })
}

function userPurchase() {
    connection.query("select * from products", function(err,results) {
        if(err) throw err;

    inquirer.prompt(
        [{
        type: "input",
        name: "item",
        message: "Enter in the ID number of the item you would like to purchase?"
    },
     {
         type: "input",
         name: "quantityWanted",
         message: "Enter in the quantity you would like to purchase of the chosen item?",
     }
]).then(function(answer) {
    var chosenID;
    for (var i = 0; i < results.length; i++) {
        var chosenID;
            chosenID = results[i];
    }
    
        console.log(chosenID.product_name)

})
    connection.end();
}
    )};