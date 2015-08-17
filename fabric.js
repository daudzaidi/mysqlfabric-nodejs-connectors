var mysql = require('mysql');
var get_range = require('./model/get_range');
var get_shard = require('./model/get_shard');
 
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
										if((data[j][k-1].lower_bound) <= key && (data[j][k].lower_bound) > key ){
											 keyVal = data[j][k-1].group_id;
										
										}else if(k == data[1].length-1 &&  key >= data[j][k].lower_bound){ 
											 keyVal = data[j][k].group_id;
										}
									}
								}
								console.log(keyVal);

								get_shard(conn,keyVal,function(err,shard){
							//	console.log(shard);
								shard.forEach(function(eachShard){
									eachShard.forEach(function(eachRecord){
										var modeNo = getMode(mode);
										if(eachRecord.group_id == keyVal && eachRecord.mode == modeNo){
											
											server1 = eachRecord.host;

											}
								
										});
									});
									var cursor = dbObj(mysql,cfg,server1,db[0]);
									console.log(cursor);
									cb(cursor);
								});
					});
		}
		return fabric;
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
function getMode(mode){
	if(mode == 'MODE_READONLY')
		return '1';
	else if(mode == 'MODE_WRITEONLY')
		return '2';
	else{
		return '3';
	}
}
