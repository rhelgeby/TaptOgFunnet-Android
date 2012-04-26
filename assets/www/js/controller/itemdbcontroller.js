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
 * Adds the specified item.
 *
 * @param item      Item object to add.
 * @param onSuccess (Callback) Item was added successfully.
 * 					TODO: First parameter is item ID.
 * @param onError   (Callback) Failed to add item. First parameter is a
 *                  SQLError object from PhoneGap.
 */
DemoApp.ItemController.prototype.addItem = function(item, onSuccess, onError) {
	this.db.transaction(createAndAdd, function(){}, onError);
	
	var createAndAdd = function(tx) {
		tx.executeSQL("DROP TABLE IF EXISTS ITEM");
		tx.executeSQL("CREATE TABLE IF NOT EXISTS ITEM (" +
						"id INTEGER PRIMARY KEY AUTOINCREMENT ASC, name TEXT, " +
						"loc TEXT, pic TEXT, desc TEXT, phone DOUBLE, " +
						"email TEXT, notifyEmail TEXT, notifySMS TEXT, " +
						"notifyAlert TEXT, lng TEXT, lat TEXT, time INTEGER)");
		tx.executeSQL("INSERT INTO ITEM (name, loc, pic, desc, phone, " +
						"email, notifyEmail, notifySMS, notifyAlert, lng, lat, time) " +
						"VALUES (" + item.name + ", " + item.location + ", " +
						item.imageURL + ", " + item.description + ", " + item.phone
						+ ", " + item.email + ", " + item.notifyEmail + ", " + 
						item.notifySMS + ", " + item.notifyAlert + ", " + item.longitude
						+ ", " + item.latitude + ", " + item.timestamp + ")");
	};
	
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
	var sql = "SELECT * FROM item WHERE id = " + itemId;
	
	var getData = function(tx) {
		tx.executeSql(sql, [], querySuccess, onError);
	}
	
	var querySuccess = function(tx, resultSet) {
    	// Fetch item.
		var result = resultSet.rows.item(0);
		var item = this.fetchItem(result);
		
		// Call success callback, pass item object.
		onSuccess(item);
    }
	
	this.db.transaction(getData, function(){}, onError);
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
 * @returns 		Item object.
 */
DemoApp.ItemController.prototype.fetchItem = function(row) {
	var item = new Item();
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
