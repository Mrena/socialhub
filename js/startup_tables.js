var startup_da_tables = require("./data_access/startup_da_tables");


var startup_tables = function(client,mysql_con,fs){
	
	
	client.on("create_tables_table",function(){
		try{
			
		startup_da_tables.createTablesTable(client,mysql_con);
		
		}catch(error){
			
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 10;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("create_photographers_table",function(){
		
		try{
			
			startup_da_tables.createOnlyPhotographersTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 26;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	
	client.on("create_packages_table",function(){
		
		try{
			
			startup_da_tables.createOnlyPackagesTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 42;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
		
	});
	
	client.on("create_orders_table",function(){
		
		try{
			
			startup_da_tables.createOnlyOrdersTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 58;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
		
		
		
	});
	
	client.on("create_areas_table",function(){
		
		try{
			
			startup_da_tables.createOnlyAreasTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 76;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("create_city_table",function(){
		
		try{
			
			startup_da_tables.createOnlyCityTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 91;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
		
		
	});
	
	client.on("create_userIDs_table",function(){
		
		try{
			
			startup_da_tables.createOnlyUserIDsTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 108;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
		
		
	});
	
	client.on("create_users_table",function(){
		
		try{
			
			startup_da_tables.createOnlyUsersTable(client,mysql_con);
			
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 125;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
	});
	
	client.on("create_admin_table",function(){
		
		try{
			
			startup_da_tables.createOnlyAdminTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 140;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("create_admin_rights_table",function(){
		
		try{
			
			startup_da_tables.createOnlyAdminRightsTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 155;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
		
		
	});
	
	client.on("create_alerts_table",function(){
		
		try{
			
			startup_da_tables.createOnlyAlertsTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 172;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	
	client.on("create_delivery_method_table",function(){
		
		try{
			
			startup_da_tables.createOnlyDeliveryMethodTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 188;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	
	client.on("delete_photographers_table",function(){
		
	try{
			
		startup_da_tables.deletePhotographersTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 204;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	
	client.on("delete_packages_table",function(){
		
		try{
			
			startup_da_tables.deletePackagesTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 220;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("delete_orders_table",function(){
		
		try{
			
			startup_da_tables.deleteOrdersTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 235;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("delete_areas_table",function(){
		
		try{
			
			startup_da_tables.deleteAreasTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 250;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
		
		
	});
	
	client.on("delete_city_table",function(){
		
		try{
			
			startup_da_tables.deleteCityTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 267;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("delete_userIDs_table",function(){
		
		try{
			
			startup_da_tables.deleteUserIDsTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 282;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
		
		
	});
	
	client.on("delete_users_table",function(){
		
		try{
			
			startup_da_tables.deleteUsersTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 299;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("delete_admin_table",function(){
		
		try{
			
			startup_da_tables.deleteAdminTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 314;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("delete_admin_rights_table",function(){
		
		try{
			
			startup_da_tables.deleteAdminRightsTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 329;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("delete_alerts_table",function(){
		
		try{
			
			startup_da_tables.deleteAlertsTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 344;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("delete_delivery_method_table",function(){
		
		try{
			
			startup_da_tables.deleteDeliveryMethodTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 359;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	
	client.on("empty_photographers_table",function(){
		
		
	try{
			
		startup_da_tables.emptyPhotographersTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 376;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	
	client.on("empty_packages_table",function(){
		
		try{
			
			startup_da_tables.emptyPackagesTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 392;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
		
	});
	
	client.on("empty_orders_table",function(){
		
		try{
			
			startup_da_tables.emptyOrdersTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 408;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("empty_areas_table",function(){
		
		try{
			
			startup_da_tables.emptyAreasTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 423;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
		
	});
	
	client.on("empty_city_table",function(){
		
		try{
			
			startup_da_tables.emptyCityTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 439;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("empty_userIDs_table",function(){
		
		try{
			
			startup_da_tables.emptyUserIDsTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 454;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("empty_users_table",function(){
		
		try{
			
			startup_da_tables.emptyUsersTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 469;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("empty_admin_table",function(){
		
		try{
			
			startup_da_tables.emptyAdminTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 484;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("empty_admin_rights_table",function(){
		
		try{
			
			startup_da_tables.emptyAdminRightsTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 499;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("empty_alerts_table",function(){
		
		try{
			
			startup_da_tables.emptyAlertsTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 514;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("empty_delivery_method_table",function(){
		
		try{
			
			startup_da_tables.emptyDeliveryMethodTable(client,mysql_con);
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 529;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("reset_system",function(){
		
		try{
			
			startup_da_tables.resetSystem(client,mysql_con);	
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 544;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	client.on("get_tables_data",function(){
		
		try{
			
			startup_da_tables.getTablesData(client,mysql_con);	
			
		}catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 559;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		
	});
	
	 client.on("create_tables",function(){
		 
    try{
		 
		 startup_da_tables.createTables(client,mysql_con);
		 
	 }catch(error){
			console.log(error);
			var file_name = "startup_tables.js",
			line_number = 574;
			startup_da_tables.logSystemError(error,file_name,line_number);
		}
		 
	 }); 
	
	
};


exports.startup_tables = startup_tables;