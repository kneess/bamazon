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
            console.log("ID: " + res[i].item_id + " |" +"Item: "+ res[i].product_name + " |" +"Department: " + res[i].department_name + " |" + "Price: " + res[i].price + " |" + "Quantity: " + res[i].stock_quantity + "\n")
        }
       userPurchaseId()
    })
}

function userPurchaseId() {
    connection.query("select * from products", function(err,results) {
        if(err) throw err;
        var productNumber = results.length;
        console.log("Choose an item from our inventory you would like to purchase item ID's are listed above ^")
    inquirer.prompt(
        [{
        type: "input",
        name: "item",
        message: "Enter in the ID number of the item you would like to purchase?",
        validate: function(value) {
            value = parseInt(value);
            if (isNaN(value)) {
                return "Input a number please";
            } else if (value < 1 || value > productNumber) {
            return "Sorry invalid ID number";
          }
          return true;
        }
    },
     {
         type: "input",
         name: "quantityWanted",
         message: "Enter in the quantity you would like to purchase of the chosen item?",
         validate: function(value) {
             value = parseInt(value);
            if (isNaN(value) === true) {
              return "Input a number please else if you would like to cancel your order please enter 0";
            }
            return true;
          },
     }
]).then(function(answer) {
    var chosenID;
    for (var i = 0; i < results.length; i++) {
        if (results[i].item_id === parseInt(answer.item)) {
            chosenID = results[i];
        }
    
    };

    
    //console.log(answer.quantityWanted)
    
        if(chosenID.stock_quantity >= parseInt(answer.quantityWanted)) {
            
             var newQuantity = chosenID.stock_quantity - parseInt(answer.quantityWanted);
              var itemid = parseInt(answer.item);
              var total = chosenID.price * parseInt(answer.quantityWanted);
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                    stock_quantity: newQuantity
                },
                {
                    item_id: chosenID.item_id
                }
            ],
            function(error) {
                if (error) throw error; 
                console.log("Your order total is: $" + total);
                connection.end();
              }
            );
        }
        else {
            // bid wasn't high enough, so apologize and start over
            console.log(" sorry! we currently dont have enough stock to fulfill your order please we currently have " + chosenID.stock_quantity + " on hand please enter try another option or another quantity you would like to order");
            userPurchaseId();
          }
})
}
    )};