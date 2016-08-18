var express = require('express');
var router = express.Router();
var _ = require('underscore');

var employees = [
  {
    id: 1,
	  name: 'John Hopkins',
    designation: 'Reasearch Assistant',
    department: 'Department of Advanced Science & Applied Physics',
    salary: '$125000',
    age: '36',
    type: 'Part Time',
    contact: '573-124-8978',
    email: 'jhopkins@hawk.iit.edu'
  },
  {
    id: 2,
    name: 'Henry Dickens',
    designation: 'Admissions Expert',
    department: 'Graduate Admissions',
    salary: '$95000',
    age: '29',
    type: 'Contract',
    contact: '683-164-8948',
    email: 'hdickens@iit.edu'
  },
  {
    id: 3,
    name: 'Terry James',
    designation: 'Graduate Assistant',
    department: 'Office of Graudate Academic Affairs',
    salary: '$75000',
    age: '23',
    type: 'On Campus',
    contact: '312-164-8145',
    email: 'tjames@hawk.iit.edu'
  },
  {
    id: 4,
    name: 'Sanjeev Gupta',
    designation: 'Professor & Dean',
    department: 'Department of Aerospace Engineering',
    salary: '$115000',
    age: '53',
    type: 'Full Time - Visiting Faculty',
    contact: '+91 9034813400',
    email: 'sanjeev_gupta@gmail.com'
  },
  {
    id: 5,
    name: 'Xing Jhua',
    designation: 'Student Assistant',
    department: 'Office of Career Services',
    salary: '$35000',
    age: '19',
    type: 'Trainee',
    contact: '987-789-7899',
    email: 'xing_2007@outlook.com'
  }
];

function lookupEmployee(employee_id) {
  return _.find(employees, function(c) {
    return c.id == parseInt(employee_id);
  });
}

router.get('/', function(req, res, next) {
  res.json('list',{employees: employees});
});

router.post('/', function(req, res, next) {
  res.send("Hello Inside Post");
});

router.route('/:employee_id')
	.all(function(req, res, next){
		employee_id = req.params.employee_id;
		employee = lookupEmployee(employee_id);
		next();
	})
	.get(function(req,res,next){
		res.json('viewControl', {employee: employee});
	});

module.exports = router;
