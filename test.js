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
fabric.set_property({tables: 'employees.employees',key : 3000},
	function(cursor){
		cursor.connect();
		cursor.query('SELECT * from employees.employees', function(err, rows, fields){
		  if (err) throw err;
			  console.log('Query', rows);  
		});
	});
