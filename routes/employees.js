var express = require('express'); 
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');

var employees = [];

var dataPath = 'employee.json';

try {
  var stats = fs.statSync(dataPath);
  var dataString = fs.readFileSync(dataPath);
  employees = JSON.parse(dataString);
} catch (e) {
  console.log('Data File Does Not Exist... Creating Empty File...');
  fs.writeFileSync(dataPath, JSON.stringify([]));
}

function lookupEmployee(employee_id) {
  return _.find(employees, function(c) {
    return c.id == parseInt(employee_id);
  });
}

//Handle for no data condition - Produces NaN for Employee ID
function findMaxId() {
  return _.max(employees, function(employee) {
    return employee.id;
  });
}



router.get('/', function(req, res, next) {
  res.render('list',{employees: employees});
});

router.post('/', function(req, res, next) {
  var employeeDepartmentID=0;
  if(findMaxId().id == null)
  {
   employeeDepartmentID=0;
  } else {
    employeeDepartmentID=findMaxId().id;
  }
  var new_employee_id = employeeDepartmentID + 1;
  var new_employee = {
    id: new_employee_id,
    name: req.body.name,
    designation: req.body.designation,
    department: req.body.department,
    salary: req.body.salary,
    gender: req.body.gender,
    age: req.body.age,
    type: req.body.type,
    contact: req.body.contact,
    email: req.body.email
  };
  employees.push(new_employee);
  fs.writeFileSync(dataPath, JSON.stringify(employees));
 //res.send("New contact created with id: " + new_contact.id);
  res.redirect('/employees/');
});

router.get('/add', function(req, res, next) {
  res.render('addEmployee', {employee:{}});
});

router.route('/:employee_id')
	.all(function(req, res, next){
		employee_id = req.params.employee_id;
		employee = lookupEmployee(employee_id);
		next();
	})
	
  .get(function(req,res,next){
		res.render('edit', {employee: employee});
  })
  
  .put(function(req,res,next){
    employee.name = req.body.name,
    employee.designation = req.body.designation,
    employee.department = req.body.department,
    employee.salary = req.body.salary,
    employee.gender = req.body.gender,
    employee.age = req.body.age,
    employee.type = req.body.type,
    employee.contact = req.body.contact,
    employee.email = req.body.email

    fs.writeFileSync(dataPath, JSON.stringify(employees));
    res.redirect('/employees/');
  })

  .delete(function(req,res,next){
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].id === parseInt(employee_id)) {
        employees.splice(i, 1);
      }
    }
    fs.writeFileSync(dataPath, JSON.stringify(employees));
    res.send('Delete for Employee' + employee_id);
	});

module.exports = router;
