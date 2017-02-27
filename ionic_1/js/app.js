// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.constants', 'app.controllers', 'app.routes', 'app.directives','app.services', 'ion-google-place', 'ngMockE2E'])

/*
.config(function($ionicConfigProvider, $sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
  $ionicConfigProvider.views.maxCache(0);
})
*/

.config(function($ionicConfigProvider){
      $ionicConfigProvider.views.maxCache(0);
})

.run(function($ionicPlatform, $rootScope, $httpBackend) {
  $httpBackend.whenGET('http://localhost:8100/valid')
        .respond({message: 'This is my valid response!'});
  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
        .respond(401, {message: "Not Authenticated"});
  $httpBackend.whenGET('http://localhost:8100/notauthorized')
        .respond(403, {message: "Not Authorized"});
  $httpBackend.whenGET(/templates\/\w+.*/).passThrough();

    $rootScope.hideTabs = '';

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    
    console.log("********** In Angular Constructor")
    $rootScope.testTrips = [];
    $rootScope.bucketTrips = [];
    
    // AJAX call to send the photo and other tipr data to the server   
    $.ajax({
        url: "php/download.php?",
        type: "POST",             // Type of request to be send, called as method
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(data)   // A function to be called if request succeeds
            {
            console.log(data);
            if(data != "0 results")
                {
                var myObj = $.parseJSON(data);
                for(var i = 0; i < myObj.length; i++) {
                    var obj = myObj[i];
                    //access data like this:
                    console.log("dbKey: " + parseInt(myObj[i].dbKey) );
                    console.log("tripName: " + myObj[i].tripName);
                    console.log("archived: " + myObj[i].archived);
                    console.log("location: " + myObj[i].location);
                    console.log("date: " + myObj[i].date);
                    console.log("descriptionText: " + myObj[i].descriptionText);
                    console.log("latlng: " + myObj[i].latlng);
                    console.log("imageLocation: " + myObj[i].imageLocation);
                    $rootScope.testTrips.push({     dbKey:parseInt(myObj[i].dbKey),
                                                    text:myObj[i].tripName,
                                                    archived:myObj[i].archived,
                                                    location:myObj[i].location,
                                                    date:myObj[i].date,
                                                    descriptionText:myObj[i].descriptionText,
                                                    latlng:myObj[i].latlng,                                                    
                                                    image:myObj[i].imageLocation});
                    }
                }
            } 
        });

    // AJAX call to send the photo and other tipr data to the server   
    $.ajax({
        url: "php/downloadBucketList.php?",
        type: "POST",             // Type of request to be send, called as method
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(data)   // A function to be called if request succeeds
            {
            console.log(data);
            if(data != "0 results")
                {
                var myObj = $.parseJSON(data);
                for(var i = 0; i < myObj.length; i++) {
                    var obj = myObj[i];
                    //access data like this:
                    console.log("dbKey: " + parseInt(myObj[i].dbKey) );
                    console.log("bucketLocation: " + myObj[i].bucketLocation);
                    console.log("latlng: " + myObj[i].latlng);
                    console.log("reg_date: " + myObj[i].reg_date);
                    $rootScope.bucketTrips.push({   dbKey:parseInt(myObj[i].dbKey),
                                                    bucketLocation:myObj[i].bucketLocation,
                                                    latlng:myObj[i].latlng,
                                                    eg_date:myObj[i].reg_date,});
                    }
                }
            } 
        });
        
  //$rootScope.test = 0;
})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if ('data' in next && 'authorizedRoles' in next.data) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          $state.go($state.current, {}, {reload: true});
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        }
    }
 
    if (!AuthService.isAuthenticated()) {
        if (next.name !== 'tabsController.settings') {
          event.preventDefault();
          $state.go('tabsController.settings');
        }
      }
      
  });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var place = attrs['hrefInappbrowser'] || '_system';
      element.bind('click', function (event) {

        var href = event.currentTarget.href;

        window.open(href, place, 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});