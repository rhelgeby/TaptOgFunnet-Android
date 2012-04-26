function buildItemTests()
{
	var itemTests = new TestCollection("Item Model Tests");
	
	itemTests.addTest(new TestCase("Empty location", "index.html",
	[
		function(testRunner)
		{
			var item = new DemoApp.Item();
            var itemController = new DemoApp.ItemController();
            
            // Set minimum data, except location name.
            item.location = "";
            item.name = "Dummy Item";
            item.phone = "12345678";
            
            var onSuccess = testRunner.createErrorCallback("Didn't catch empty location.");
            
            var onError = testRunner.createCallback(function(itemErr)
            {
                if (itemErr.code != DemoApp.ItemError.INVALID_LOCATION)
                {
                    // Something else failed.
                    throw itemErr.toString();
                }
                
                // Success.
            });
            
            itemController.addItem(item, onSuccess, onError);
            
            // Wait for callbacks.
            return false;
		}
	]));
	
	itemTests.addTest(new TestCase("Empty name", "index.html",
	[
		function(testRunner)
		{
			var item = new DemoApp.Item();
            var itemController = new DemoApp.ItemController();
            
            // Set minimum data, except name.
            item.location = "Home";
            item.name = "";
            item.phone = "12345678";
            
            var onSuccess = testRunner.createErrorCallback("Didn't catch empty name.");
            
            var onError = testRunner.createCallback(function(itemErr)
            {
                if (itemErr.code != DemoApp.ItemError.INVALID_NAME)
                {
                    // Something else failed.
                    throw itemErr.toString();
                }
                
                // Success.
            });
            
            itemController.addItem(item, onSuccess, onError);
            
            // Wait for callbacks.
            return false;
		}
	]));
	
	itemTests.addTest(new TestCase("Contact info", "index.html",
	[
		function(testRunner)
		{
			var item = new DemoApp.Item();
            var itemController = new DemoApp.ItemController();
            
            // Set minimum data, except contact info.
            item.location = "Home";
            item.name = "Dummy Item";
            item.phone = "";
            item.mobile = "";
            item.email = "";
            
            var onSuccess = testRunner.createErrorCallback("Didn't catch missing contact info.");
            
            var onError = testRunner.createCallback(function(itemErr)
            {
                if (itemErr.code != DemoApp.ItemError.INVALID_CONTACT_INFO)
                {
                    // Something else failed.
                    throw itemErr.toString();
                }
                
                // Success.
            });
            
            itemController.addItem(item, onSuccess, onError);
            
            // Wait for callbacks.
            return false;
		}
	]));
	
	itemTests.addTest(new TestCase("Add item", "index.html",
	[
		function(testRunner)
		{
			var item = new DemoApp.Item();
            var itemController = new DemoApp.ItemController();
            
            // Set minimum data.
            item.location = "Home";
            item.name = "Dummy Item";
            item.description = "Test item.";
            item.phone = "12345678";
            
            var onSuccess = testRunner.createNoOpCallback();
            
            var onError = testRunner.createCallback(function(itemErr)
            {
                throw itemErr.toString();
            });
            
            itemController.addItem(item, onSuccess, onError);
            
            // Wait for callbacks.
            return false;
		}
	]));
	
	itemTests.addTest(new TestCase("Add item to DB", "index.html",
	[
		function(testRunner)
		{
			var item = new DemoApp.Item();
            var itemController = new DemoApp.ItemDBController();
            
            // Set minimum data.
            item.location = "Home";
            item.name = "Dummy Item";
            item.description = "Test item.";
            item.phone = "12345678";
            
            var onSuccess = testRunner.createNoOpCallback();
            
            var onError = testRunner.createCallback(function(err)
            {
                throw err.message();
            });
            
            itemDBController.addItem(item, onSuccess, onError);
            
            // Wait for callbacks.
            return false;
		}
	]));
	
	return itemTests;
}
