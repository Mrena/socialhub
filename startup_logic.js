 var startup_da = require('./js/data_access/startup_da.js');


var startup = function(client,fs){
	
  client.on("create_database",function(database_name){
	  
	  startup_da.createDatabase(database_name,client);
	  
  });
	
 client.on("create_tables",function(){
	 
	 
	 startup_da.createTables(client);
	 
 }); 
 
 client.on("add_sample_data",function(){
	 
	 startup_da.addSampleData(client);
	 
 });
	
	
	
};

exports.startup = startup;