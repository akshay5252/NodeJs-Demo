var express = require('express'); 
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');
var validator = require('validator');
var departments = [];

var dataPath = 'department.json';

try {
  var stats = fs.statSync(dataPath);
  var dataString = fs.readFileSync(dataPath);
  departments = JSON.parse(dataString);
} catch (e) {
  console.log('Data File Does Not Exist... Creating Empty File...');
  fs.writeFileSync(dataPath, JSON.stringify([]));
}

function lookupDepartment(department_id) {
  return _.find(departments, function(c) {
    return c.id == parseInt(department_id);
  });
}

//Handle for no data condition - Produces NaN for Employee ID
function findMaxId() {
  return _.max(departments, function(department) {
    return department.id;
  });
}

router.get('/', function(req, res, next) {
  res.render('listDepartment',{departments: departments});
});

router.post('/', function(req, res, next) {
  var tempDepartmentID=0;
  if(findMaxId().id == null)
  {
   tempDepartmentID=0;
  } else {
    tempDepartmentID=findMaxId().id;
  }
  var new_department_id = tempDepartmentID + 1;
  
  var new_department = {
    id: new_department_id,
    name: req.body.name,
    location: req.body.location,
    email:req.body.email,
    contact:req.body.contact
  };
  departments.push(new_department);
  fs.writeFileSync(dataPath, JSON.stringify(departments));
  res.redirect('/departments/');
});

router.get('/add', function(req, res, next) {
  res.render('addDepartment', {department:{}});
});

router.route('/:department_id')
  .all(function(req, res, next){
    department_id = req.params.department_id;
    department = lookupDepartment(department_id);
    next();
  })
  
  .get(function(req,res,next){
    res.render('edit1', {department: department});
  })
  
  .put(function(req,res,next){
    console.log("Inside put");
    department.name = req.body.name,
    department.location = req.body.location,
    department.email=req.body.email,
    department.contact=req.body.contact    

    fs.writeFileSync(dataPath, JSON.stringify(departments));
    res.redirect('/departments/');
  })

  .delete(function(req,res,next){
    console.log("Inside Delete");
    for (var i = 0; i < departments.length; i++) {
      if (departments[i].id === parseInt(department_id)) {
        departments.splice(i, 1);
      }
    }
    fs.writeFileSync(dataPath, JSON.stringify(departments));
    res.send('Delete for Employee' + department_id);
  });

module.exports = router;
