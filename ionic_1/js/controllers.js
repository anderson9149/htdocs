angular.module('app.controllers', [])
  
.controller('tripListCtrl', ['$scope', '$stateParams', '$rootScope', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $ionicPopup) {
    console.log("************** Inside tripCtrl");
    console.log("length: " + $rootScope.testTrips.length);
    $scope.locationDateText = "Test Text";
    
    $scope.deleteTrip = function(trip) {
        var index = $rootScope.testTrips.indexOf(trip);
        console.log("Delete trip at array index: " + index + " and dbKey: " + $rootScope.testTrips[index].dbKey );
        console.log("Delete trip photo: " + $rootScope.testTrips[index].image );
        // AJAX call to delete trip    
        $.ajax({
            url: "php/delete.php?" +    "dbKey=" + $rootScope.testTrips[index].dbKey + 
                                        "&imageToDelete=" + $rootScope.testTrips[index].image,
            type: "POST",             // Type of request to be send, called as method
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false
            success: function(data)   // A function to be called if request succeeds
                {
                console.log(data);
                $rootScope.testTrips.splice(index, 1);
                $scope.$apply(); //this triggers a $digest
                } 
            });        
    };
    
     // A confirm dialog
     $scope.confirmDelete = function(trip) {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Delete Trip',
         template: 'Are you sure you want to delete this trip?'
       });

       confirmPopup.then(function(res) {
         if(res) {
            $scope.deleteTrip(trip); 
            console.log('Delete Trip');
         } else {
            console.log('Do not delete the trip');
         }
       });
     };
 
}])
   
.controller('mapViewCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {
    //Set base latlng
    var myLatLng = {lat: 41.91862886518304, lng: -87.64892578125};
    
    // Create the map
    var mapCanvas = document.getElementById("map1");
    var mapOptions = {
        center: myLatLng,
        zoom: 5
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
        
    // set the bounds so the map will show all markers
    var bounds = new google.maps.LatLngBounds();
    var marker = new Array();
    //var infowindows = new Array();
    console.log("Number of trips:" + $rootScope.testTrips.length);
    for(var i = 0; i < $rootScope.testTrips.length; i++){
        console.log("pre-processed latlong:" + $rootScope.testTrips[i].latlng);
        if($rootScope.testTrips[i].latlng != "null"){
            var str = $rootScope.testTrips[i].latlng;
            console.log("pre-processed latlong:" + str);
            // Clean up the string and convert to a float as needed for google map API
            str = str.replace("(", "");
            str = str.replace(")", "");    
            str = str.replace(",", "");
            str = str.split(" ");
            console.log("post-procssed lat:" + str[0]);
            console.log("post-procssed long:" + str[1]);
            var newLatLng = {lat: parseFloat(str[0]), lng: parseFloat(str[1]) };
            //var newLatLng = {lat: 41.91862886518304, lng: -87.64892578125};
            // Make the markers to put on the map
            marker[i] = new google.maps.Marker({
                map: map,
                position: newLatLng
            });
            
            var contentString =     $rootScope.testTrips[i].text + "</br>" +
                                    $rootScope.testTrips[i].location + " " + $rootScope.testTrips[i].date;
            
            var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
            /*
            google.maps.event.addListener(marker[i], 'click', function() {
                infowindows[i].open(map, marker[i]);
            });
            */   
            marker[i].addListener('click', function() {
                infowindow.open(map, this);
                });
            bounds.extend(newLatLng);
        }
    }
    
    // Don't zoom in too far on only one marker
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
       var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
       var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
       bounds.extend(extendPoint1);
       bounds.extend(extendPoint2);
    }
    map.fitBounds(bounds);

/*
    // Make the markers to put on the map
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng
    });
*/    
}])
   
.controller('bucketListCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicLoading', '$timeout', '$ionicPopover', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, $ionicLoading, $timeout, $ionicPopover) {

    // Create the map
    var mapCanvas = document.getElementById("bucketMap");
    var mapOptions = {
        //center: new google.maps.LatLng(41.91862886518304, -87.64892578125),
        center: new google.maps.LatLng(39.8282, -98.5795),
        zoom: 3
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    
    /*
    // Bind the location enter field to autocomplete
    var input = document.getElementById("location-input");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    // Place a marker on the map
    var marker = new google.maps.Marker({
          map: map
    });
    */

}])
      
.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('addTripCtrl', ['$scope', '$stateParams', '$rootScope', '$ionicLoading', '$ionicPopup', '$timeout',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $ionicLoading, $ionicPopup, $timeout) { 
    $scope.hideMap = false;

    // Create the map
    var mapCanvas = document.getElementById("map2");
    var mapOptions = {
        center: new google.maps.LatLng(41.91862886518304, -87.64892578125),
        zoom: 5
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    // Bind the location enter field to autocomplete
    var input = document.getElementById("location-input");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    // Place a marker on the map
    var marker = new google.maps.Marker({
          map: map
    });
    
    // This makes googles autocomplete component work on a mobile device
    $scope.disableTap = function(){
        console.log("********* ng-focus called from location input field **********");
        container = document.getElementsByClassName('pac-container');
        // disable ionic data tab
        angular.element(container).attr('data-tap-disabled', 'true');
        // leave input field if google-address-entry is selected
        angular.element(container).on("click", function(){
            document.getElementById('searchBar').blur();
        });
    };
 
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }
        console.log("Place name = " + place.name);
        console.log("Place Location = " + place.geometry.location);
        console.log("Full name = " + place.formatted_address);
        console.log("Place ID = " + place.place_id);
        
        map.setCenter(place.geometry.location);
        map.setZoom(5);
            
        /* 
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
            } else {
            map.setCenter(place.geometry.location);
            map.setZoom(5);
        }
        */
           
        // Set the position of the marker using the place ID and location.
        marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
        });
        marker.setVisible(true);
        
        $scope.locationText = place.formatted_address;
        $scope.loactionLatLng = place.geometry.location;
    });
    
    // Variables to manage the file input directive
    $scope.file = null;
    $scope.clearFileInput = function() {
        $scope.file = null;
    };
    
    // Funciton to clear the inputs
    $scope.clearInputs = function() { 
        $scope.tripText = "";
        $scope.locationText = "";
        $scope.dateText = "";
        $scope.descriptionText = "";
        $scope.loactionLatLng = null;
        $scope.clearFileInput();
    };
    
    // Setup Controller variables
    var photofile = null;
    $scope.clearInputs();
    //Setup spinner variables
    $scope.showSpinner = false;
    $scope.popupAddedText1 = "Trip Added";
    $scope.popupAddedText2 = "Trip added";

    // Add a trip function to call from HTML
    $scope.addTrip = function() {
        // Trim white space off the inputs
        $scope.tripText.trim();
        $scope.locationText.trim();
        if($scope.dateText != ""){
            $scope.dateString = $scope.dateText.getMonth( ) + 1 +'/'+ $scope.dateText.getDate( ) + '/' +$scope.dateText.getFullYear( );
        } else {
            $scope.dateString = "";
        }
            
        $scope.descriptionText.trim();
        
        console.log("Trip Text: " + $scope.tripText + " Location Text: " + $scope.locationText);
        // Check input values to confirm a valid trip has been entered and should be added
        if ( ($scope.tripText == "") || ($scope.locationText == "") ){
            $scope.formNotCompleteAlert();
        }
        else {
            $scope.hideMap = true;
            $scope.showSpinner = true;

            $ionicLoading.show({
              template: 'Adding Trip...',
              duration: 10000
            }).then(function(){
               console.log("The loading indicator is now displayed");
            });

            /*
            // Might need to handle a case when the AJAX doesn't return, TBD
            $timeout(function () {
                $ionicLoading.hide();
                $scope.showSpinner = true;
            }, 10000);
            */

            // Create a form to send the photofile to the server
            var form_data = new FormData();  
            var imagePath;

            // If a photo was selected, add that data to the form and set the path
            if(photofile!=null){
                form_data.append('file', photofile);
                imagePath = "php/upload/" + photofile.name;
            }
            else{ // if no photo was selected, set the path to default
                imagePath = "php/upload/No-Images.png";
            }

            // AJAX call to send the photo and other tipr data to the server    
            $.ajax({
                url: "php/upload.php?" +    "tripName=" + $scope.tripText +
                                            "&archived=false" +
                                            "&location=" + $scope.locationText +
                                            "&date=" + $scope.dateString +
                                            "&descriptionText=" + $scope.descriptionText +
                                            "&latlng=" + $scope.loactionLatLng +                                            
                                            "&imageLocation=" + imagePath,// Url to which the request is send
                type: "POST",             // Type of request to be send, called as method
                data: form_data,
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false
                success: function(data)   // A function to be called if request succeeds
                    {
                    console.log(data);
                    var myObj = $.parseJSON(data);
                    //you can now access data like this:
                    console.log("dbKey: " + myObj[0].dbKey);
                    console.log("tripName: " + myObj[0].tripName);
                    console.log("archived: " + myObj[0].archived);
                    console.log("location: " + myObj[0].location);
                    console.log("date: " + myObj[0].date);
                    console.log("descriptionText: " + myObj[0].descriptionText);
                    console.log("latlng: " + myObj[0].latlng);
                    console.log("imageLocation: " + myObj[0].imageLocation); 
                    $rootScope.testTrips.push({     dbKey:myObj[0].dbKey,
                                                    text:myObj[0].tripName,
                                                    archived:myObj[0].archived,
                                                    location:myObj[0].location,
                                                    date:myObj[0].date,
                                                    descriptionText:myObj[0].descriptionText,
                                                    latlng:myObj[0].latlng,                                                    
                                                    image:myObj[0].imageLocation});
                    $ionicLoading.hide();
                    $scope.showSpinner = false;
                    $scope.hideMap = false;
                    $scope.$apply(); //this triggers a $digest
                    //console.log("length: " + $rootScope.testTrips.length);
                    //photofile = null;
                    $scope.popupAddedText1 = myObj[0].tripName + " Trip Added!";
                    $scope.popupAddedText2 = myObj[0].location;
                    if(myObj[0].date!=""){
                        $scope.popupAddedText2 = $scope.popupAddedText2 + " on " + myObj[0].date;
                    }
                    $scope.showAlert();
                    }
                });
            $scope.clearInputs();    
        }
    };
 
    // An alert for once the trip is added
    $scope.showAlert = function() {
        console.log("in show alert");
        var alertPopup = $ionicPopup.alert({
            title: $scope.popupAddedText1,
            template: $scope.popupAddedText2
        });
        alertPopup.then(function(res) {
            console.log('Alert removed');
        });
        $timeout(function() {
            alertPopup.close(); //close the popup after 4 seconds
        }, 4000);
    };

     
    // An alert for once the trip is added
    $scope.formNotCompleteAlert = function() {
        console.log("in show alert");
        var alertPopup = $ionicPopup.alert({
            title: 'Unable to Add Trip',
            template: 'Trip Name and Location Required.'
        });
        alertPopup.then(function(res) {
            console.log('Alert removed');
        });
        $scope.clearInputs();
        $timeout(function() {
            alertPopup.close(); //close the popup after 6 seconds for some reason
        }, 4000);
    };
    
    // function called by HTML when a new file is selected
    $scope.file_changed = function(element) {
        console.log("******** In File Changed **************");
        $scope.$apply(function(scope) {  
            photofile = element.files[0];
            /*
            var reader = new FileReader();
            reader.onload = function(e) {
               // handle onload
            };
            reader.readAsDataURL(photofile);
            */
        });
    };

}])
 
.controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [
      {text:'I have stopped caching', done:true},
      {text:'build an angular app', done:false}];
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });