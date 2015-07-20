var mysql = require('mysql');
var get_range = require('./model/get_range');
var get_shard = require('./model/get_shard');
var hashmap = require('hashmap');

 module.exports = function(cfg) {
var cursor;
 	var fabric = {};

 	//init
 	cfg1 = {
			host: 'localhost',
			port: 32275,
			username: cfg.fabric.user,
			password: cfg.fabric.pass
		}
		var conn = mysql.createConnection(cfg1);
		conn.connect();

		fabric.set_property = function(options,cb){
			tables = options.tables;
			key = options.key;
			group = options.group;
			mode = options.mode;
			scope = options.scope;
			var lower_bound = [];
			var db  = tables.split(".");
				var server1 ;
						get_range(conn,function(err,data){
								var	j=1;
								var keyVal;
									for(var k=1; k<data[j].length;k++){
										if(scope == 'SCOPE_GLOBAL'){
											keyVal = data[j][k].global_group;
											console.log(keyVal);
										}
										else{
										//console.log(data[j].length);
										if((data[j][k-1].lower_bound) <= key && (data[j][k].lower_bound) > key ){
											 keyVal = data[j][k-1].group_id;
										
										}else if(k == data[1].length-1 &&  key >= data[j][k].lower_bound){ 
											 keyVal = data[j][k].group_id;
										}
									}
								}
								console.log(keyVal);

								get_shard(conn,keyVal,function(err,shard){
								var map = new hashmap();
								console.log(shard);
								shard.forEach(function(eachShard){
									eachShard.forEach(function(eachRecord){
										//console.log(eachRecord.group_id);
										if(eachRecord.group_id == keyVal && eachRecord.mode == 1){
											//console.log(eachRecord.host);
											server1 = eachRecord.host;



											//map.set(eachRecord.group_id,eachRecord.host+"_"+eachRecord.mode);
										//	console.log(map.set(eachRecord.group_id,eachRecord.host+"_"+eachRecord.mode))

											}
									//shardardObj.push({group_id : eachRecord.group_id,host : eachRecord.host}
										});
									});
										var cursor = dbObj(mysql,cfg,server1,db[0]);
										console.log(server1);
											cb(cursor);

								});
						
					
						// server = map.get(keyVal);
						// 	server = server.split("_");
						// 		if(mode == 'MODE_READWRITE'){
									
						// 			if(server == 3)
						// 				server = server[0];
						// 		}else if(mode == 'MODE_READONLY'){
									
						// 			if(server == 1)
						// 				server = server[0];
						// 		}

						// console.log(server);
					

						// cursor.connect();
						// cursor.query('SELECT * from employees.employees', function(err, rows, fields) {
						//   if (err) throw err;

						//   console.log('The solution is: ', rows);
						// });

						//console.log(cursor);
					
						//cursor.end();
						//return "hello";
						
						
				

					});


			
					//console.log(cursor);

		}
		
		return fabric;
		
 }


 function checkScope(scope){
 	if(scope == 'SCOPE_GLOBAL')
 		return 'SCOPE_GLOBAL';
 }

function dbObj(mysql,config,host,db){
	var connection = mysql.createConnection({
	  host     : host,
	  user     : config.user,
	  password : config.pass,
	  database : db
	});
return connection;
}
