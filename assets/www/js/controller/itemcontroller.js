// Tapt og funnet-App
// Type: Controller
// itemcontroller.js

if (typeof DemoApp == "undefined") {
    DemoApp = {};
}

/**
 * Constructs a item controller. This constructor will also create a item
 * database controller.
 */
DemoApp.ItemController = function() {
    // TODO: Implementation.
}

/**
 * Adds the specified item.
 *
 * @param item      Item object to add.
 * @param onSuccess (Callback) Item was added successfully. First parameter is
 *                  item ID.
 * @param onError   (Callback) Failed to add item. First parameter is an
 *                  ItemError object. Error codes:
 *                  -1 on invalid location,
 *                  -2 on invalid name,
 *                  -3 if missing contact information (phone or email)
 *                  (todo: database errors)
 */
DemoApp.ItemController.prototype.addItem = function(item, onSuccess, onError) {
    // Not implemented.
    setTimeout(function()
    {
        onError(new DemoApp.ItemError(-100, "Not implemented"));
    }, 10);
}

/**
 * Gets the item with the specified ID.
 *
 * @param itemId    Item ID.
 * @param onSuccess (Callback) Item was found. First parameter is the item
 *                  object.
 * @param onError   (Callback) Failed to get item. First parameter is an
 *                  ItemError object. Error codes:
 *                  -1 on invalid id
 *                  (todo: database errors)
 */
DemoApp.ItemDBController.prototype.getItem = function(itemId, onSuccess, onError) {
    // Not implemented.
    setTimeout(function()
    {
        onError(new DemoApp.ItemError(-100, "Not implemented"));
    }, 10);
}

/**
 * Gets a list of items.
 *
 * @param location  (Optional) Filter by location.
 * @param onSuccess (Callback) Query successful. First parameter is an array
 *                  with item object. This array still may be empty.
 * @param onError   (Callback) Query failed. First parameter is an ItemError
 *                  object. Error codes:
 *                  (todo: database errors)
 */
DemoApp.ItemController.prototype.list = function(location, onSuccess, onError) {
    // Not implemented.
    setTimeout(function()
    {
        onError(new DemoApp.ItemError(-100, "Not implemented"));
    }, 10);
}
