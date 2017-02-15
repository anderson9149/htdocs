angular.module('app.controllers', [])
  
.controller('tripListCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {
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
}])
   
.controller('mapViewCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('bucketListCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicLoading', '$timeout', '$ionicPopover', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, $ionicLoading, $timeout, $ionicPopover) {
    $scope.myValue = false;
    $scope.myHeader = "Hello World!";
    
    // An alert dialog
    $scope.showAlert = function() {
        console.log("in show alert");
        var alertPopup = $ionicPopup.alert({
            title: 'Don\'t eat that!',
            template: 'It might taste good'
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
    
    $scope.show = function() {
        $ionicLoading.show({
          template: 'Loading...',
          //duration: 10000
        }).then(function(){
           console.log("The loading indicator is now displayed");
        });
        $scope.myValue = true;
        $timeout(function () {
            $scope.myHeader = "How are you today?";
            $ionicLoading.hide();
            $scope.myValue = false;
        }, 5000);
    };
    
    $scope.hide = function(){
        $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
        });
    };
    
    $scope.hideandshow = function(){
        $scope.myValue = true;
    };
    
 /*
    $timeout(function () {
        $scope.myHeader = "How are you today?";
    }, 2000);
*/

// .fromTemplate() method
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hidden popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

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
    
    // Funciton to clear the inputs
    $scope.clearInputs = function() { 
        $scope.tripText = "";
        $scope.locationText = "";
        $scope.dateText = "";
        $scope.descriptionText = "";        
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
                    console.log("imageLocation: " + myObj[0].imageLocation); 
                    $rootScope.testTrips.push({     dbKey:myObj[0].dbKey,
                                                    text:myObj[0].tripName,
                                                    archived:myObj[0].archived,
                                                    location:myObj[0].location,
                                                    date:myObj[0].date,
                                                    descriptionText:myObj[0].descriptionText,
                                                    image:myObj[0].imageLocation});
                    $ionicLoading.hide();
                    $scope.showSpinner = false;
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
            alertPopup.close(); //close the popup after 6 seconds for some reason
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