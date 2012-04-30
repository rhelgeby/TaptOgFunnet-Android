// Tapt og funnet-App
// Type: Database controller
// itemdbcontroller.js

if (typeof DemoApp == "undefined") {
    DemoApp = {};
}

/**
 * Constructs a item database controller.
 */
DemoApp.ItemDBController = function() {
    // Create DB shell.
	this.db = window.openDatabase("items", "1.0", "items", 1000000); 
}

/**
 * Prepares a empty item table. If it doesn't exist it's created. If it's
 * deleted first.
 * 
 * @param onSuccess	(Callback) Table was created successfully.
 * @param onError	(Callback) Failed to create table.
 */
DemoApp.ItemDBController.prototype.prepareTable = function(onSuccess, onError) {

	var sql = "CREATE TABLE IF NOT EXISTS 'item' ("
		+ "'id' INTEGER PRIMARY KEY AUTOINCREMENT, 'name' TEXT, "
		+ "'loc' TEXT, 'pic' TEXT, 'desc' TEXT, 'phone' TEXT, "
		+ "'email' TEXT, 'notifyEmail' TEXT, 'notifySMS' TEXT, "
		+ "'notifyAlert' TEXT, 'lng' REAL, 'lat' REAL, 'time' INTEGER)";
	
	var transaction = function(tx) {
		tx.executeSql("DROP TABLE IF EXISTS 'item'");
		tx.executeSql(sql);
	}
	
	this.db.transaction(transaction, onError, onSuccess);
}

/**
 * Adds the specified item.
 *
 * @param item      Item object to add.
 * @param onSuccess (Callback) Item was added successfully.
 * 					TODO: First parameter is item ID.
 * @param onError   (Callback) Failed to add item. First parameter is a
 *                  SQLError object from PhoneGap.
 */
DemoApp.ItemDBController.prototype.addItem = function(item, onSuccess, onError) {
	console.log("db addItem");
	
	var transaction = function(tx) {
		tx.executeSql("INSERT INTO 'item' ('name', 'loc', 'pic', 'desc', 'phone', 'email', 'notifyEmail', 'notifySMS', 'notifyAlert', 'lng', 'lat', 'time') "
						+ "VALUES ('" + item.name + "', '" + item.location + "', '"
						+ item.imageURL + "', '" + item.description + "', '"
						+ item.phone + "', '" + item.email + "', '"
						+ item.notifyEmail + "', '" + item.notifySMS + "', '"
						+ item.notifyAlert + "', '" + item.longitude + "', '"
						+ item.latitude + "', '" + item.timestamp + "')");
	};
	
	this.db.transaction(transaction, onError, onSuccess);
	
	// koble til db (bruk onError, lag eget callback for onSuccess selv)
	//
	// bygg opp streng med spørring
	// send spørring (i onsuccess)
	// bruk onerror hvis spørring går galt
	
}

/**
 * Gets the item with the specified ID.
 *
 * @param itemId    Item ID.
 * @param onSuccess (Callback) Item was found. First parameter is the item
 *                  object.
 * @param onError   (Callback) Failed to get item. First parameter is a
 *                  SQLError object from PhoneGap.
 */
DemoApp.ItemDBController.prototype.getItem = function(itemId, onSuccess, onError) {
	console.log("db getItem");
	
	// TODO: Handle error callbacks and pass DemoApp.ItemError objects as
	//		 parameters.
	
	var _controller = this;
	var querySuccess = function(tx, resultSet) {
		console.log("db getItem success");
		
		// Check if not found.
		if (resultSet.rows.length == 0) {
			onError.apply(onError, [new DemoApp.ItemError(DemoApp.ItemError.INVALID_ID, "Invalid ID")]);
			return;
		}
		
    	// Fetch item.
		var result = resultSet.rows.item(0);	// "item" is row item, not a DemoApp.Item.
		console.log("db getItem result: " + result);
		var item = _controller.fetchItem(result);
		console.log("db getItem item:" + item);
		
		// Call success callback, pass item object as parameter.
		onSuccess.apply(onSuccess, [item]);
    }
	
	var getData = function(tx) {
		var sql = "SELECT * FROM item WHERE id = " + itemId;
		console.log("db getItem query: " + sql);
		tx.executeSql(sql, [], querySuccess, onError);
	}
	
	this.db.transaction(getData, onError, onSuccess);
}

/**
 * Gets a list of items.
 *
 * @param location  (Optional) Filter by location.
 * @param onSuccess (Callback) Query successful. First parameter is an array
 *                  with item object. This array still may be empty.
 * @param onError   (Callback) Query failed. First parameter is a SQLError
 *                  object from PhoneGap.
 */
DemoApp.ItemController.prototype.list = function(location, onSuccess, onError) {
    // Not implemented.
    setTimeout(function()
    {
        onError(new DemoApp.ItemError(-100, "Not implemented"));
    }, 10);
}

/**
 * Fetches a item row into an Item object.
 * 
 * @param row		Object with item data attributes.
 * @returns 		Item object, or null if row is undefined.
 */
DemoApp.ItemDBController.prototype.fetchItem = function(row) {
	// Simple validation.
	if (typeof row == "undefined")
	{
		console.log("Warning: Attempting to fetch a item row from nothing.");
		return null;
	}
	
	var item = new DemoApp.Item();
	item.location = row.loc;
	
	item.name = row.name;
	item.imageUrl = row.pic;
	item.description = row.desc;
	
	item.phone = row.phone;
	item.email = row.email;
	
	// Notification options.
	item.notifyEmail = row.notifyEmail == "true" ? true : false;
	item.notifySMS = row.notifySMS == "true" ? true : false;
	item.nofifyAlert = row.notifyAlert == "true" ? true : false;
	
	item.latitude = row.lat;
	item.longitude = row.lng;
	
	// UNIX timestamp.
	item.timestamp = row.time;
	
	return item;
}
