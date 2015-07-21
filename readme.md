#ReadMe

#Mysqlfabric Nodejs-connector

Node Js connector for mysql fabric can be used to connect node js app with Mysql fabric. It assumes that HA and Sharding configuration is already done and is merely providing an interface to Node js app to connect to Mysql Fabric Server only for RANGE BASED SHARDING
For more information on MysqlFabric visit : https://dev.mysql.com/doc/mysql-utilities/1.4/en/fabric.html

Python connector developed by Mysql can be found [here](https://dev.mysql.com/doc/mysql-utilities/1.4/en/connector-python-fabric-connect.html) 

**Note: Only range based shard queries supported currently.**

#TO Do
Following functionalities are not yet implemented : 
* HASH based sharding
* Load Balancing in case of multiple Secondary Servers in a group.
* Caching information coming from Fabric to speed up operations

#Usage
Download the latest version from Git Repo and copy the fies in the app folder. 
Define the configuration to connect to fabric state store and other servers.

        var config = {
              fabric: {
                host: 'localhost', //fabric state store host
                port: 3306,   //fabric state store port
                user: 'root', //fabric state store user
                pass: '1234'  //fabric state store pass
              },

              user: 'user1', // Shard/HA servers user
              pass: ''       // Shard/HA servers pass

        }



Require fabric.js in the script where Mysql Fabric related queries are to be used and pass the above configuration as following :

        var fabric = require('./fabric')(config);

To access a database set one or more properties of the Fabric connection object using its set_property() method.

These **set_property()** arguments are shard-related:

**tables**: The sharding table or tables

**mode**: Whether operations are read/write or read only

**scope**: Whether operations are local or global

**key**: The key that identifies which row to affect

Of which 

**mode** is optional. The default is **MODE_READWRITE** if this property is omitted.

**scope** is optional. The default is **SCOPE_LOCAL** if this property is omitted.

**key**: If scope is **SCOPE_LOCAL**, key is required to indicate which row to affect. If scope is SCOPE_GLOBAL, key is inapplicable; do not specify it.

When the mode argument is applicable, these values are permitted:

**MODE_READWRITE**: Connect to a master server. This is the default.

**MODE_READONLY**: Connect to a slave if one is available, to the master otherwise. Load Balancing is NOT yet implemented in case of multiple secondary servers.

When the scope argument is applicable, these values are permitted:

**SCOPE_LOCAL**: Local operation that affects the row with a given key. This is the default.

**SCOPE_GLOBAL**: Global operation that affects all rows.

To specify shard tables and shard keys, use the tables and key attributes of the set_property() method.

The format of each shard table is usually given as 'db_name.tbl_name'.

        fabric.set_property({tables: 'employees.employees',key : 3000},
          function(err, cursor){
                    if (err || !cursor) {
                      console.log(err)  // If error or cursor not found dump error
                    }else{
                      cursor.connect();  // connect to the shard server
                      cursor.query('SELECT * from employees.employees WHERE emp_no = 3000', function(err, rows, fields){  // quering the mysql fabric servers
                        if (err) throw err; 
                          console.log('Query', rows);  
                  });
              }
          });


By default, operations occur in local scope, or the scope property can be given to specify local or global scope explicitly. For local operations (as in the preceding example), the key argument must be specified to indicate which row to use. For global operations, do not specify the key attribute because the operation is performed on all rows in the table:

        fabric.set_property({tables: 'employees.employees',scope: 'SCOPE_GLOBAL'},
        function(err, cursor){
                  if (err || !cursor) {
                    console.log(err)  // If error or cursor not found dump error
                  }else{
                    cursor.connect();  // connect to the shard server
                    cursor.query('UPDATE employees SET last_name = UPPER(last_name)', function(err, rows, fields){  // Updating the GLOBAL Table
                      if (err) throw err; 
                        console.log('Query', rows);  
                });
            }
        });

The default mode is read/write, so the driver connects to the master. The mode property can be given to specify read/write or read-only mode explicitly:

     fabric.set_property({tables: 'employees.employees', mode : "MODE_READWRITE"},
    function(err, cursor){
              if (err || !cursor) {
                console.log(err)  // If error or cursor not found dump error
              }else{
                cursor.connect();  // connect to the shard server
                cursor.query('UPDATE employees SET last_name = UPPER(last_name)', function(err, rows, fields){  // Updating the GLOBAL Table
                  if (err) throw err; 
                    console.log('Query', rows);  
            });
        }
      });

There is also a test.js file which contains the sample code to query from Mysql Fabric Servers.

Any further suggestion and modification are welcome.

Email : daud.zaid@gmail.com
