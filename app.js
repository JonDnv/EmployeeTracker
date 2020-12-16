const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
      switch (menu) {
        case "View":
          vw();
          break;
        case "Add":
          add();
          break;
        case "Update":
          upd();
          break;
        case "Delete":
          del();
          break;
        default:
          connection.end();
          break;
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
          "Main Menu",
        ],
      },
    ])
    .then(({ viewType }) => {
      switch (viewType) {
        case "Departments":
          departmentView();
          break;
        case "Roles":
          roleView();
          break;
        case "Employees":
          employeeView();
          break;
        case "Employees By Manager":
          employeeByManagerView();
          break;
        case "Utilized Budget By Department":
          utilizedBudgetView();
          break;
        default:
          menu();
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
        choices: ["Department", "Role", "Employee", "Main Menu"],
      },
    ])
    .then(({ addType }) => {
      switch (addType) {
        case "Department":
          departmentAdd();
          break;
        case "Role":
          roleAdd();
          break;
        case "Employee":
          employeeAdd();
          break;
        default:
          menu();
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
        choices: ["Employee Role", "Employee Manager", "Main Menu"],
      },
    ])
    .then(({ updateType }) => {
      switch (updateType) {
        case "Employee Role":
          empRoleUpdate();
          break;
        case "Employee Manager":
          empManagerUpdate();
          break;
        default:
          menu();
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
        choices: ["Department", "Role", "Employee", "Main Menu"],
      },
    ])
    .then(({ deleteType }) => {
      switch (deleteType) {
        case "Department":
          deptDelete();
          break;
        case "Role":
          roleDelete();
          break;
        case "Employee":
          empDelete();
          break;
        default:
          menu();
          break;
      }
    });
}

function departmentView() {
  connection.query(
    "select department.id 'Department ID', department.name 'Department Name', count(DISTINCT role.id) 'Role Count', count(distinct employee.id) 'Employee Count' from department left join role on department.id = role.department_id inner join employee on role.id = employee.role_id group by department.id, department.name;",
    (err, res) => {
      if (err) throw err;
      console.log("\n");
      console.table("Department Information", res);
      console.log("\n");
      inquirer
        .prompt([
          {
            name: "continue",
            type: "list",
            message:
              "Would You Like to Return to the Main Menu or Continue Searching?",
            choices: ["Main Menu", "Continue Searching"],
          },
        ])
        .then((data) => {
          if (data.continue === "Main Menu") {
            menu();
          } else vw();
        });
    }
  );
}

function roleView() {
  connection.query(
    "select r.id 'Role ID', r.title 'Role Title', r.salary 'Role Salary', IFNULL(count(DISTINCT e.id),0) 'Employees Per Role' from role r left join employee e on r.id = e.role_id group by r.id, r.title, r.salary;",
    (err, res) => {
      if (err) throw err;
      console.log("\n");
      console.table("Role Information", res);
      console.log("\n");
      inquirer
        .prompt([
          {
            name: "continue",
            type: "list",
            message:
              "Would You Like to Return to the Main Menu or Continue Searching?",
            choices: ["Main Menu", "Continue Searching"],
          },
        ])
        .then((data) => {
          if (data.continue === "Main Menu") {
            menu();
          } else vw();
        });
    }
  );
}

function employeeView() {
  connection.query(
    "select concat(e.first_name, ' ', e.last_name) 'Employee Name', d.name 'Department', r.title 'Role', r.salary 'Salary' ,IFNULL(concat(e2.first_name, ' ', e2.last_name),'None') 'Manager Name' from employee e left join role r on e.role_id = r.id left join department d on r.department_id = d.id left join employee e2 on e.manager_id = e2.id;",
    (err, res) => {
      if (err) throw err;
      console.log("\n");
      console.table("Employee Information", res);
      console.log("\n");
      inquirer
        .prompt([
          {
            name: "continue",
            type: "list",
            message:
              "Would You Like to Return to the Main Menu or Continue Searching?",
            choices: ["Main Menu", "Continue Searching"],
          },
        ])
        .then((data) => {
          if (data.continue === "Main Menu") {
            menu();
          } else vw();
        });
    }
  );
}

function employeeByManagerView() {
  connection.query(
    "select distinct concat(e2.first_name, ' ', e2.last_name) 'ManagerName' from employee e left join employee e2 on e.manager_id = e2.id where e2.last_name is not null;",
    (err, res) => {
      if (err) throw err;

    }
  );
}

function utilizedBudgetView() {}

function departmentAdd() {}

function roleAdd() {}

function employeeAdd() {}

function empRoleUpdate() {}

function empManagerUpdate() {}

function deptDelete() {}

function roleDelete() {}

function empDelete() {}

connection.connect((err) => {
  if (err) throw err;
  console.log("You Are Connected To The Employee Tracker App");
  menu();
});
