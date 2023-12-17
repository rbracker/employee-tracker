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