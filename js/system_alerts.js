var startup_da_parent = require(__dirname+"/startup_da_parent");
var system_alerts_da = require(__dirname+"/data_access/system_alerts_da");

var system_alerts = function(client){
	
	client.on("update_admin_alerts",function(objAdminAlerts){
		
		objAdminAlerts = JSON.parse(objAdminAlerts);
		system_alerts_da.updateAdminAlerts(client,objAdminAlerts.username,objAdminAlerts.alert_type,objAdminAlerts.alert_value);
		
	});
	
	
	
	
	
};