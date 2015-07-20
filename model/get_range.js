
module.exports = function(conn,cb){
	//conn.connect();
	conn.query('CALL dump.sharding_information()', function(err, rows, fields) {
		  if (!err) {
		  		//console.log(rows);
				cb(null,rows);
			}
		  else{
		  	cb(err);
		  }
		  ;
	});
}
