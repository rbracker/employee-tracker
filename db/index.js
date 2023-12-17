const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Beans306427*',
  database: 'employee_db',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
  startApp();
});

function startApp() {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Exit'],
    })
    .then(answer => {
      switch (answer.action) {
        case 'View Departments':
          viewDepartments();
          break;

        case 'View Roles':
          viewRoles();
          break;

        case 'View Employees':
          viewEmployees();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Exit':
          console.log('Exiting the application.');
          db.end();
          break;
      }
    });
}
// Function to view departments
function viewDepartments() {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

// Function to view roles
function viewRoles() {
  db.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

// Function to view employees
function viewEmployees() {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    console.table(results);
    startApp();
  });
}

// Function to add a new department
function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the new department:',
    })
    .then(answer => {
      db.query('INSERT INTO department (name) VALUES (?)', [answer.departmentName], (err, results) => {
        if (err) throw err;
        console.log('New department added successfully!');
        startApp();
      });
    });
}

// Function to add a new role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'number',
        name: 'roleSalary',
        message: 'Enter the salary for the new role:',
      },
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department for the new role:',
      },
    ])
    .then(answers => {
      // Find the department ID based on the entered department name
      db.query('SELECT id FROM department WHERE name = ?', [answers.departmentName], (err, results) => {
        if (err) throw err;

        // Check if the department exists
        if (results.length === 0) {
          console.log('Department not found. Please add the department first.');
          startApp();
        } else {
          const departmentId = results[0].id;

          // Insert the new role into the role table
          db.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [answers.roleTitle, answers.roleSalary, departmentId],
            (err, results) => {
              if (err) throw err;
              console.log('New role added successfully!');
              startApp();
            }
          );
        }
      });
    });
}
