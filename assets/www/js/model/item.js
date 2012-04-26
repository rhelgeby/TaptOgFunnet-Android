// Tapt og funnet-App
// Type: Model
// item.js

if (typeof DemoApp == "undefined") {
    DemoApp = {};
}

DemoApp.Item = function() {
    // City name.
    this.location = "";
    
    this.name = "";
    this.imageUrl = "";
    this.description = "";
    
    this.phone = "";
    this.mobile = "";
    this.email = "";
    
    // Notification options.
    this.notifyEmail = false;
    this.notifySMS = false;
    this.nofifyAlert = false;   // Alert message in app.
    
    this.latitude = 0.0;
    this.longitude = 0.0;
    
    // UNIX timestamp.
    this.timestamp = 0;
}

/**
 * Constructs an item error object with the specified code and message.
 *
 * @param errCode       Error code.
 * @param message       Error mesasge.
 */
DemoApp.ItemError = function(errCode, message) {
    this.code = errCode;
    this.message = message;
}

DemoApp.ItemError.prototype.toString = function() {
    return "ItemError " + this.code + ": " + this.message;
}

// Error codes:
DemoApp.ItemError.INVALID_LOCATION = 1;
DemoApp.ItemError.INVALID_NAME = 2;
DemoApp.ItemError.INVALID_CONTACT_INFO = 3;
DemoApp.ItemError.INVALID_ID = 4;
