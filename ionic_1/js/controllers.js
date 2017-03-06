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
    var originalLatLng = {lat: 41.91862886518304, lng: -87.64892578125};
    // Create the map
    var mapCanvas = document.getElementById("map1");    
    var map = new google.maps.Map(mapCanvas, {
        zoom: 5,
        minZoom: 1,
        center: originalLatLng,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });
        
    // set the bounds so the map will show all markers
    var bounds = new google.maps.LatLngBounds();
    var marker = new Array();
    var infowindows = new Array();
    var newLatLng = new Array();
    console.log("Number of trips:" + $rootScope.testTrips.length);
    // Loop through all the trips and add a markter for each
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
            newLatLng[i] = {lat: parseFloat(str[0]), lng: parseFloat(str[1]) };
            // Make the markers to put on the map
            marker[i] = new google.maps.Marker({
                map: map,
                position: newLatLng[i]
            });
            marker[i].i = i;
            
            // Create the content for the infowindow
            var contentString =     "<div>" +
                                    "<h4>" + $rootScope.testTrips[i].text + "</h4>" +
                                    $rootScope.testTrips[i].location + " on " + $rootScope.testTrips[i].date + "<br>" +
                                    "<img src=" + $rootScope.testTrips[i].image + " width='225' >" + "<br>" +
                                    $rootScope.testTrips[i].descriptionText + 
                                    "</div>";
            infowindows[i] = new google.maps.InfoWindow({ content: contentString });
            
            // Listen for a close event and recenter the map when the window closes
            google.maps.event.addListener(infowindows[i],'closeclick',function(){
                console.log("infowindow closed");
                map.panTo(originalLatLng);
                map.setZoom(5);
                map.fitBounds(bounds);
            });
            
            // Listen for the marker to get clicked
            marker[i].addListener('click', function() {
                console.log("marker selected = " + this.i);
                for(var i = 0; i < $rootScope.testTrips.length; i++) {
                    console.log("close infowindow for marker: " + i + " Trip Name: " + $rootScope.testTrips[i].text + " Location: " + $rootScope.testTrips[i].location + " latlng: " + $rootScope.testTrips[i].latlng);
                    // Close the windows for 
                    if($rootScope.testTrips[i].latlng != "null")
                        infowindows[i].close();
                } 
                console.log(newLatLng[this.i]);
                //var zoomLatLng = {lat: (newLatLng[this.i].lat+5), lng: newLatLng[this.i].lng};
                var zoomLatLng = {lat: (newLatLng[this.i].lat+5), lng: newLatLng[this.i].lng};
                map.setCenter(zoomLatLng);
                console.log(zoomLatLng);
                map.setZoom(5);
                infowindows[this.i].open(map, this);
            });
            
            bounds.extend(newLatLng[i]);
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
 
}])

.controller('bucketListCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicLoading', '$timeout', '$ionicPopover', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, $ionicLoading, $timeout, $ionicPopover, $rootScope) {
    //Set base latlng
    //var originalLatLng = {lat: 41.91862886518304, lng: -87.64892578125};
    var originalLatLng = {lat: 0, lng: 0};
    $scope.bucketPlaceText = "";
    //$scope.bucketListText = "Enter a Location";
    $scope.currentBucketSelection = -1;
    
    // Create the map
    var mapCanvas = document.getElementById("map2");    
    var map = new google.maps.Map(mapCanvas, {
        zoom: 1,
        minZoom: 1,
        center: originalLatLng,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });
    // Create variables for managing map elements
    var bounds = new google.maps.LatLngBounds();
    var marker = new Array();
    var infowindows = new Array();
    var newLatLng = new Array();
    console.log("Number of trips: " + $rootScope.bucketTrips.length);
    if($rootScope.bucketTrips.length > 0){
        CreateAndDrawMapElements();
        fitMap();
    }
    // Bind the location enter field to autocomplete
    var input = document.getElementById("bucketList-input");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
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
        $scope.bucketPlaceText = place.formatted_address;
        $scope.bucketPlaceLatLng = place.geometry.location;
        $scope.bucketPlaceID = place.place_id;
                
        map.setCenter(place.geometry.location);
        map.setZoom(5);
        
        // Place a marker on the map
        var marker = new google.maps.Marker({ map: map });
        // Make the markers to put on the map
        marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });        
        //marker.setPosition(place.geometry.location);
        marker.setVisible(true);
 
        var contentString = "<div id='Infowindowcontent'>"+
                            $scope.bucketPlaceText + "</br>" +
                            "<iframe src='https://www.youtube.com/embed/oA-9RLPRTY4?playsinline=1'" +
                            "width='260' height='145' frameborder='0' allowfullscreen></iframe>" +
                            "</div>";
        //infowindow.setContent(contentString);    
        var infowindow = new google.maps.InfoWindow({ content: contentString });  
        infowindow.open(map, marker);
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
        
        // Listen for a close event and redraw the map view
        google.maps.event.addListener(infowindow,'closeclick',function(){
            console.log("infowindow closed");
            CreateAndDrawMapElements();
            $scope.bucketPlaceText = "";
            //$scope.bucketListText = "Enter a location";
            //document.getElementById("bucketList-input").val("Test");
            });
        
    });

    // Put the bucketlist markers on the map
    // set the bounds so the map will show all markers   
    function CreateAndDrawMapElements(){
        //Clear map element arrays and we will recreate based on current $rootScope.bucketTrips.length
        bounds = new google.maps.LatLngBounds();
        newLatLng.length = 0;
        //hide all the markers before reseting the array
        for(var i = 0; i <marker.length; i++){
            marker[i].setVisible(false); 
        }
        marker.length = 0;
        for(var i = 0; i <infowindows.length; i++){
            infowindows[i].close(); 
        }    
        infowindows.length = 0;
        
        // Loop through all the trips and add a markter for each
        for(var i = 0; i < $rootScope.bucketTrips.length; i++){
            if($rootScope.bucketTrips[i].latlng != "null"){
                console.log("ID: " + i + " BucketLocaiton: " + $rootScope.bucketTrips[i].bucketLocation);
                var str = $rootScope.bucketTrips[i].latlng;
                //console.log("pre-processed latlong:" + str);
                // Clean up the string and convert to a float as needed for google map API
                str = str.replace("(", "");
                str = str.replace(")", "");    
                str = str.replace(",", "");
                str = str.split(" ");
                //console.log("post-procssed lat:" + str[0]);
                //console.log("post-procssed long:" + str[1]);
                newLatLng[i] = {lat: parseFloat(str[0]), lng: parseFloat(str[1]) };
                // Make the markers to put on the map
                marker[i] = new google.maps.Marker({
                    map: map,
                    position: newLatLng[i]
                });
                // Add the index as a member of the marker so we can reference it in the "click" callback
                marker[i].i = i;         

                // Listen for the marker to get clicked
                marker[i].addListener('click', function() {
                    console.log("BucketSelection = " + this.i + " latlng: " + newLatLng[this.i].lng);
                    for(var i = 0; i < $rootScope.bucketTrips.length; i++) {
                        infowindows[i].close();
                    }
                    map.setZoom(5);
                    infowindows[this.i].open(map, this);
                    $scope.currentBucketSelection = this.i;
                });

                // Create the content for the infowindow
                var contentString = "<div id='Infowindowcontent'>"+
                                $rootScope.bucketTrips[i].bucketLocation + "</br>" +
                                "<iframe src='https://www.youtube.com/embed/oA-9RLPRTY4?playsinline=1'" +
                                "width='260' height='145' frameborder='0' allowfullscreen></iframe>" +
                                "</div>";
                infowindows[i] = new google.maps.InfoWindow({ content: contentString });

                // Listen for a close event and recenter the map when the window closes
                google.maps.event.addListener(infowindows[i],'closeclick',function(){
                    console.log("infowindow closed");
                    $scope.currentBucketSelection = -1;
                    map.panTo(originalLatLng);
                    map.setZoom(5);
                    fitMap();
                }); 
                bounds.extend(newLatLng[i]);
            }
            fitMap();
        }
    }
    
    function fitMap(){
        //map.panTo(originalLatLng);
        //map.setZoom(5);
        //map.setCenter(0,0);
        google.maps.event.trigger(map, 'resize');
         // Don't zoom in too far on only one marker
        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
           var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
           var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
           bounds.extend(extendPoint1);
           bounds.extend(extendPoint2);
        }
        map.fitBounds(bounds);
        map.panToBounds(bounds);
        console.log("Map Zoom: " + map.getZoom());
    }

    $scope.deleteBucket = function() {
        console.log("BucketSelection for deletion = " + $scope.currentBucketSelection);
        if($scope.currentBucketSelection != -1){     
            // A confirm dialog
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Bucket Trip',
                template: 'Are you sure you want to delete this bucket trip?'
            });

            confirmPopup.then(function(res) {
                if(res) {
                    $scope.deleteBucketConfirmed(); 
                    console.log('Delete Trip');
                } else {
                    console.log('Do not delete the trip');
                }
            });
        }
    }
    
    $scope.deleteBucketConfirmed = function() {
        // AJAX call to delete trip    
        $.ajax({
            url: "php/deleteBucketItem.php?" + "dbKey=" + $rootScope.bucketTrips[$scope.currentBucketSelection].dbKey, 
            type: "POST",             // Type of request to be send, called as method
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false
            success: function(data)   // A function to be called if request succeeds
                {
                console.log(data);
                //$rootScope.testTrips.splice(index, 1);
                //$scope.$apply(); //this triggers a $digest
                } 
            });
        $rootScope.bucketTrips.splice($scope.currentBucketSelection, 1);
        CreateAndDrawMapElements();
    }

    $scope.addBucket = function() {
        if($scope.bucketPlaceText != ""){
            console.log("Add the bucket list item : " + $scope.bucketPlaceText + "  latlng" + $scope.bucketPlaceLatLng + "  Place ID:" + $scope.bucketPlaceID);
            $scope.hideMap = true;
            $scope.showSpinner = true;

            $ionicLoading.show({
                template: 'Adding to bucket list...',
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

            // AJAX call to send the photo and other tipr data to the server    
            $.ajax({
                url: "php/uploadBucket.php?" +  "buckettripName=" + $scope.bucketPlaceText +
                                                "&latlng=" + $scope.bucketPlaceLatLng + 
                                                "&ID" + $scope.bucketPlaceLatLng, // Url to which the request is send
                type: "POST",             // Type of request to be send, called as method
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false
                success: function(data)   // A function to be called if request succeeds
                    {
                    console.log(data);
                    var myObj = $.parseJSON(data);
                    //you can now access data like this:
                    console.log("dbKey: " + myObj[0].dbKey);
                    console.log("bucketLocation: " + myObj[0].bucketLocation);
                    console.log("latlng: " + myObj[0].latlng);
                    console.log("req_date: " + myObj[0].req_date);
                    $rootScope.bucketTrips.push({   dbKey:parseInt(myObj[0].dbKey),
                                                    bucketLocation:myObj[0].bucketLocation,
                                                    latlng:myObj[0].latlng,
                                                    eg_date:myObj[0].reg_date,});
                    console.log("************ BucketTrips contents after add");
                    for(var i = 0; i < $rootScope.bucketTrips.length; i++){
                        console.log("ID: " + i + " BucketLocaiton: " + $rootScope.bucketTrips[i].bucketLocation);
                    }
                    // Hide the loading popup
                    $ionicLoading.hide();
                    $scope.showSpinner = false;
                    // Configure and show the popup that the trip was added
                    $scope.popupAddedText1 = myObj[0].bucketLocation;
                    $scope.popupAddedText2 = "Bucket Trip Added!";
                    $scope.showAlert();                
                }
            });   
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
    var marker = new google.maps.Marker({ map: map });
    
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

    // An alert for invalid trip entry
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
  
.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
    $scope.username = AuthService.username();
 
    $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
        var alertPopup = $ionicPopup.alert({
          title: 'Please login.',
          template: 'You need to login to access this.'
        });
        alertPopup.then(function(res) {
            console.log('login removed');
            $state.go('tabsController.dashboard');
        });
    });
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('tabsController.dashboard');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Please login again.'
    });
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

.controller('settingsCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService) {
    $scope.loginMessage = "Logged in as " + $scope.username;
    $scope.showLogout = true;
    $rootScope.hideTabs = '';
  
    $scope.logout = function() {
        //AuthService.logout();
        //$scope.setCurrentUsername("");
        $state.go('tabsController.dashboard');
    };
    
})

.controller('DashCtrl', function($scope, $state, $rootScope, $http, $ionicPopup, AuthService) {
    $scope.data = {};
    $rootScope.hideTabs = 'tabs-item-hide';
    $scope.hideSignIn = "block";
    $scope.hideNewUser = "none";
    $scope.hideForgotPassword = "none";
            
    $scope.login = function(data) {
        console.log("Name: " + data.username + " Password: " + data.password);
        AuthService.login(data.username, data.password).then(function(authenticated) {        
            $rootScope.hideTabs = '';
            $scope.setCurrentUsername(data.username);
            $state.go('tabsController.tripList');
        }, function(err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sign in failed',
                template: 'Please check your credentials.'
            });
        });
    }
    
    $scope.createNewUser = function(data) {
        // Force the data to string types for manipulation
        var usernameStr = "";
        if(typeof data !== 'undefined' && typeof data.newUsername !== 'undefined')
            usernameStr = String(data.newUsername);
        var emailStr = "";
        if(typeof data !== 'undefined' && typeof data.newUsernameEmail !== 'undefined')
            emailStr = String(data.newUsernameEmail);
        var passwordStr = "";
        if(typeof data !== 'undefined' && typeof data.newUserPassword !== 'undefined')
            passwordStr = String(data.newUserPassword);
        // Trim the strings of white space
        usernameStr.trim();
        emailStr.trim();
        // Log the results
        console.log("newUserName: " + usernameStr);
        console.log("newUserEmail: " + emailStr);        
        // vars to track if the inputs are valid
        var validUserName = false;
        var validEmail = false;
        var validPassword = false;        
        // Ensure the username entered is not empty
        if(usernameStr != "")
            validUserName = true;
        // Confirm the entered email is valid
        if( validateEmail(emailStr) ){
            console.log("Valid Email");
            validEmail = true;
        }
        else {
            console.log("Invalid Email");
            validEmail = false;
        }
        // Confirm password entered is valid
        if( validatePassword(passwordStr) ){
            console.log("Valid Password");
            validPassword = true;
        }
        else {
            console.log("Invalid Password");
            validPassword = false;
        }
        
        // If each entry is valid create the user
        if(validUserName && validEmail && validPassword){
            var alertPopup = $ionicPopup.alert({
                    title: 'Creating User...',
                    template: usernameStr
            });           
        } else
        if (!validUserName){
             var alertPopup = $ionicPopup.alert({
                    title: 'Can not create user.',
                    template: 'Please enter a valid user name'
            });            
        } else
        if (!validEmail){
             var alertPopup = $ionicPopup.alert({
                    title: 'Can not create user.',
                    template: 'Please enter a valid email'
            });            
        } else
        if (!validPassword){
             var alertPopup = $ionicPopup.alert({
                    title: 'Can not create user.',
                    template: 'Please enter a valid password.  <br>Must be at least 8 characters long. <br>Must contain a lowercase letter. <br>Must contain an uppercase letter. <br>Must contain a number or special character.'
            });            
        }
            
        

    }

    // Function to validate email
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    } 
    
    function validatePassword(password){
        console.log("validate Password: " + password);
        // Check the length
        if( password.length >= 8 ) {
            //return true;
        }
        else{
            console.log("Password too short");
            return false;
        }
            
        
        // Check for lower case 
        var regex = /^(?=.*[a-z]).+$/;
        if( regex.test(password) ) {
            //return true;
        }
        else{
            console.log("Does Not Contain lower Case letter");
            return false;
        }
        
        // Check for Upper Case
        regex = /^(?=.*[A-Z]).+$/;
        if( regex.test(password) ) {
            //return true;
        }
        else{
            console.log("Does Not Contain Uper Case letter");
            return false;
        }
        
        // Check for special charecters
        regex = /^(?=.*[0-9_\W]).+$/;
        if( regex.test(password) ) {
            //return true;
        }
        else{
            console.log("Does Not Contain Specail character");
            return false;
        }
        
        //All checks passed
        return true;
    }

    // Add a trip function to call from HTML
    $scope.addUser = function() {
        $scope.hideSignIn = "none";
        $scope.hideNewUser = "block";
        $scope.hideForgotPassword = "none";
    }
    
    $scope.returnToSignIn  = function() {
        $scope.hideSignIn = "block";
        $scope.hideNewUser = "none"; 
        $scope.hideForgotPassword = "none";
    }
    
    $scope.fogotPassword  = function() {
        $scope.hideSignIn = "none";
        $scope.hideNewUser = "none"; 
        $scope.hideForgotPassword = "block";
    }
    
 /*
  $scope.performValidRequest = function() {
    $http.get('http://localhost:8100/valid').then(
      function(result) {
        $scope.response = result;
      });
  };
 
  $scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
 
  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
*/
})

/*
.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
*/