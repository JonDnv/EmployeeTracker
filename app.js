const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "RMH1981!",
  database: "EmployeeTracker",
});

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What Task Would You Like To Do?",
        choices: ["View", "Add", "Update", "Delete", "Exit"],
      },
    ])
    .then(({ menu }) => {
      if (menu === "View") {
        console.log("You Want To View");
      } else if (menu === "Add") {
        console.log("You Want To Add");
      } else if (menu === "Update") {
        console.log("You Want To Update");
      } else if (menu === "Delete") {
        console.log("You Want To Delete");
      } else {
        connection.end();
      }
    });
}

connection.connect((err) => {
  if (err) throw err;
  console.log("You Are Connected To The Employee Tracker App");
  menu();
});
