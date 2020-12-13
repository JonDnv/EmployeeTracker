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
        vw();
      } else if (menu === "Add") {
        add();
      } else if (menu === "Update") {
        upd();
      } else if (menu === "Delete") {
        del();
      } else {
        connection.end();
      }
    });
}

function vw() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "viewType",
        message: "What Would You Like To View?",
        choices: [
          "Departments",
          "Roles",
          "Employees",
          "Employees By Manager",
          "Utilized Budget By Department",
        ],
      },
    ])
    .then(({ viewType }) => {
      switch (viewType) {
        case "Departments":
          departmentView();
        case "Roles":
          roleView();
        case "Employees":
          employeeView();
        case "Employees By Manager":
          employeeByManagerView();
        case "Utilized Budget By Department":
          utilizedBudgetView();
        default:
          break;
      }
    });
}

function add() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addType",
        message: "What Would You Like To Add?",
        choices: ["Department", "Role", "Employee"],
      },
    ])
    .then(({ addType }) => {
      switch (addType) {
        case "Department":
          departmentAdd();
        case "Role":
          roleAdd();
        case "Employee":
          employeeAdd();
        default:
          break;
      }
    });
}

function upd() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "updateType",
        message: "What Would You Like To Update?",
        choices: ["Employee Role", "Employee Manager"],
      },
    ])
    .then(({ updateType }) => {
      switch (updateType) {
        case "Employee Role":
          empRoleUpdate();
        case "Employee Manager":
          empManagerUpdate();
        default:
          break;
      }
    });
}

function del() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "deleteType",
        message: "What Would You Like To Delete?",
        choices: ["Department", "Role", "Employee"],
      },
    ])
    .then(({ deleteType }) => {
      switch (deleteType) {
        case "Department":
          deptDelete();
        case "Role":
          roleDelete();
        case "Employee":
          empDelete();
        default:
          break;
      }
    });
}

connection.connect((err) => {
  if (err) throw err;
  console.log("You Are Connected To The Employee Tracker App");
  menu();
});
