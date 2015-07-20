var config = {
			fabric: {
				host: 'localhost',
				port: 3306,
				user: 'root',
				pass: '1234'
			},

			user: 'user1',
			pass: ''

}

var fabric = require('./fabric')(config);
//console.log(fabric);

// fabric.set_property(tables='employees.employees', key=40);


//  var cur = fabric.set_property({
// 	tables: 'employees.employees',
// 	key: 40
// });


fabric.set_property({tables: 'employees.employees',key : 300, mode : 'MODE_READWRITE' },
	function(cursor){
		cursor.connect();
		cursor.query('SELECT * from employees.employees', function(err, rows, fields){
		  if (err) throw err;
			  console.log('Query', rows);  
		});
	});
// fabric.set_property({tables: 'employees.employees',key:20, scope : 'SCOPE_LOCAL',mode : 'MODE_READWRITE'  },
// 	function(cursor){
// 		cursor.connect();
// 		cursor.query('SELECT * from employees.employees', function(err, rows, fields){
// 		  if (err) throw err;
// 			  console.log('Query', rows);  
// 		});
// 	});


		// var cursor = fabric.set_property({tables: 'employees.employees',	key: 3000 });
		// cursor.connect();
		// cursor.query('select * from employees.employees where emp_no = 3000', function(err, rows, fields){
		//   if (err) throw err;
		// 	  console.log('Query', rows);  
		// });






//INSERT INTO employees.employees (emp_no,first_name) VALUES("30","Daud")
//SELECT * from employees.employees

//



//console.log(ss);

//var cur = fabric();