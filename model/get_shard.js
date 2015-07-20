module.exports = function (conn,group_id,cb){
	conn.query('CALL dump.servers()', function(err, rows, fields) {
		 if (!err) {
		 	//console.log(rows.group_id);
		 	 cb(null,rows);
	
					// if(rows.group_id){
					// 		console.log(rows.host); 
					  		
					//   }
			}		  
		  else{
		  	cb(err);
		  }
		
	});
}