$(document).ready(function(){
  $(#"departmentForm").validate({
	  rules: {
		  name: "required",
		  location: "required",
		  email {
			  required: true,
			  email: true
		  }
		  salary: "required",
		},
		messages: {
			name: "Please enter department name"
			location: "Please enter location of the new department",
			email:{
				required: "Please enter new department email",
				email: "Please enter email in proper format"
			}
		}
	  
	});
    });
  }); 
});
