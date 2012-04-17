  //PhoneGap test
  
  
  
  function onLoad(){              
	  document.addEventListener("deviceready", onDeviceReady, true);
  }
   
  var pictureSource;   // picture source
  var destinationType; // sets the format of returned value 
  
  // PhoneGap is ready to be used!
  //
  function onDeviceReady() {
	  console.log("Ondeviceready");
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  
  // Called when a photo is successfully retrieved
  //
  function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);
      
      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      
      // Unhide image elements
      //
      smallImage.style.display = 'block';
      
      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = imageData;
      //smallImage.src = "data:image/jpeg;base64," + imageData;
  }
  
  // Called when a photo is successfully retrieved
  //
  function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      // console.log(imageURI);
      
      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');
      
      // Unhide image elements
      //
      largeImage.style.display = 'block';
      
      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
  }
  
  // A button will call this function
  //
  function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
  }
  
  // A button will call this function
  //
  function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
  }
  
  // A button will call this function
  //
  function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
                                  destinationType: destinationType.FILE_URI,
                                  sourceType: source });
  }
  
  // Called if something bad happens.
  // 
  function onFail(message) {
      alert('Failed because: ' + message);
  }
  
  // onSuccess Geolocation
  //
  function onSuccess(position) {
      var element = document.getElementById('geolocation');
      element.innerHTML = 
   	  'Latitude: '           + position.coords.latitude              + '<br />' +
      'Longitude: '          + position.coords.longitude             + '<br />' +
      'Accuracy: '           + position.coords.accuracy              + '<br />' +
      'Timestamp: '          + new Date(position.timestamp)          + '<br />';
  }
  
  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }
  
  function fu(){
      console.log("Notification popup virker!");
  }
  
  function showAlert() {
      navigator.notification.alert(
            'Det er blitt lagt til et Beats headset!',// message
            fu(),
            'Varsel',            // title
            'Er det ditt?'       // buttonName
                );
  }
  
  // Beep three times
  //
  function playBeep() {
      navigator.notification.beep(3);
  }
  
  // Vibrate for 2 seconds
  //
  function vibrate() {
      navigator.notification.vibrate(300);
       
  }