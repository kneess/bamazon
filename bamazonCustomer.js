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
            console.log(res[i].item_id + "|" + res[i].product_name + "|" + res[i].department_name + "|" + res[i].price + "|" + res[i].stock_quantity)
        }
        connection.end();
    })
}