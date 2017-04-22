angular.module('app.services', [])

.service('AuthService', function($q, $http, USER_ROLES, $rootScope) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var LOCAL_USERNAME_KEY = "yourUserNameKey"
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    var name = window.localStorage.getItem(LOCAL_USERNAME_KEY);
    if (token) {
      useCredentials(name, token);
    }
  }
 
  function storeUserCredentials(name, token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    window.localStorage.setItem(LOCAL_USERNAME_KEY, name);
    useCredentials(name, token);
  }
 
  function useCredentials(name, token) {
    username = name;
    isAuthenticated = true;
    authToken = token;
 /*
    if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'user') {
      role = USER_ROLES.public
    }
*/
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    window.localStorage.removeItem(LOCAL_USERNAME_KEY);
  }
 
  var login = function(name, pw) {
    return $q(function(resolve, reject) {
            var login = 0;
            // AJAX call to send the photo and other tipr data to the server    
            $.ajax({
                url: "php/loginUser.php?" + "&email=" + name + 
                                            "&userPassword=" + pw, // Url to which the request is send
                type: "POST",             // Type of request to be send, called as method
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData:false,        // To send DOMDocument or non processed data file it is set to false
                success: function(data)   // A function to be called if request succeeds
                    {
                    login = data;
                    console.log("Valid Credntiails: " + login);
                    if (login == 1) {
                            // Make a request and receive your auth token from your server
                            storeUserCredentials(name, 'yourServerToken');
                            resolve('Login success.');
                        } else {
                            reject('Login Failed.');
                        }
                    }
            });      
        });
    };
 
    var logout = function() {
        // Clear global data
        $rootScope.testTrips = [];
        $rootScope.bucketTrips = [];
        destroyUserCredentials();
    };
 
  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})

.service('InitUserService', function($q, $http, USER_ROLES, $rootScope, AuthService) {

    var loadTripListForCurrentUsername = function() {
        console.log("************ Loading Trip List");
        // AJAX call to retrieve trip data from the server   
        $.ajax({
            url: "php/download.php?" + "User=" + AuthService.username(),
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
    };
    
    var loadBucketListForCurrentUsername = function() {    
        // AJAX call to get the data for the bucket list
        console.log("************ Loading Bucekt List");
        $.ajax({
            url: "php/downloadBucketList.php?" + "User=" + AuthService.username(),
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
    };

    var loadProfileForCurrentUsername = function() {    
        // AJAX call to get the data for the bucket list
        console.log("************ Loading User Profile");
        $.ajax({
            url: "php/downloadProfile.php?" + "User=" + AuthService.username(),
            type: "POST",             // Type of request to be send, called as method
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false
            success: function(data)   // A function to be called if request succeeds
                {
                console.log(data);
                if(data != "0 results")
                    {
                        $rootScope.profilePic = "php/" + data;
                        console.log("profilePic Path = " + $rootScope.profilePic);
                    }
                } 
            });
    };
    
    return {
        loadTripListForCurrentUsername: loadTripListForCurrentUsername,
        loadBucketListForCurrentUsername: loadBucketListForCurrentUsername,
        loadProfileForCurrentUsername: loadProfileForCurrentUsername
    };
    
})
    
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
