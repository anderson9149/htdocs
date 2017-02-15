<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- LOAD YOUR CSS FILE WHILE PAYING ATTENTION TO ITS PATH! -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="TravelAppCSS/jquery.mobile-1.4.5.min.css">
    <link rel="stylesheet" href="TravelAppCSS/travel.css">
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script type="text/javascript" src="JSTravelApp/facebook.js"></script>
    </head>
</head>    

<body>

    <div id="pageOne">
        <div class="LoginArea">
            <div class="content">
                <p> Login with your facebook ID </p>
<!--            <fb:login-button scope="public_profile,email" data-size="xlarge" onlogin="checkLoginState();" data-auto-logout-link="true"> </fb:login-button> -->
                <div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="false" onlogin="checkLoginState()"></div> 
                <p> -- OR -- </p>
                <button type="button" onclick="LoginAsGuest()">Create Your Own Login</button>
            </div>
        </div>
    </div>
    
    <div data-role="page" id="pageTwo">      
        <div data-role="header">
<!--          <a href="#" class="ui-btn ui-btn-b ui-corner-all ui-shadow ui-icon-home ui-btn-icon-left">Home</a>  -->
          <h1 id="appHeader">Travel App</h1>
<!--          <a href="#" class="ui-btn ui-corner-all ui-shadow ui-icon-search ui-btn-icon-left">Search</a>     -->
        </div>
        
        <div data-role="main" class="ui-content" id="ListDiv">
            <div id="wrapper" style="text-align: center"> 
                <a data-role="content" data-inline="true">Trips in list view</a>
                <a onclick="addTrip()" data-role="button" data-inline="true" data-icon="plus" >Add</a>
            </div>
 
            <a id="ListItem" class="ui-btn ui-corner-all ui-icon-minus ui-btn-icon-right">Trip 1</a>
                
        </div>

        <div data-role="main" class="ui-content" id="MapDiv">
            <div id="wrapper" style="text-align: center">
                <a data-role="content" data-inline="true">Trips in Map view</a>
            </div>
        </div>

        <div data-role="main" class="ui-content" id="BucketDiv">
            <div id="wrapper" style="text-align: center">
                <a data-role="content" data-inline="true">Bucket List</a>
            </div>
        </div>

        <div data-role="main" class="ui-content" id="SettingsDiv">
            <div id="wrapper" style="text-align: center">
                <a data-role="content" data-inline="true">Settings</a>
                <br>
                <a onclick="logOutOfFacebook()" data-role="button" data-inline="true" >LogOut</a>
<!--                <div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="true" onlogin="checkLoginState()"></div> -->
            </div>
        </div>

        <div data-role="footer" data-position="fixed" data-tap-toggle="false">
            <div data-role="navbar">
                <ul>
                    <li><a onclick="loadHome()" data-transition="none" data-icon="home">Home</a></li>
                    <li><a onclick="loadMap()" data-transition="none" data-icon="star">Map</a></li>
                    <li><a onclick="loadBucketList()" data-transition="none" data-icon="arrow-u">Bucket List</a></li>
                    <li><a onclick="loadSettings()" data-transition="none" data-icon="gear">More</a></li>
                </ul>
            </div><!-- /navbar -->                             
        </div> 
    </div>
    
    <script>
    $(document).ready(function(){
        loadLoginPage();
        });
    
    function loadLoginPage() {
        $("#pageOne").show();
        $("#pageTwo").hide();
        $("#ListDiv").show();
        $("#MapDiv").hide(); 
        $("#BucketDiv").hide();
        $("#SettingsDiv").hide();        
    }
        
    function loadHome() {
        $("#ListDiv").show();
        $("#MapDiv").hide(); 
        $("#BucketDiv").hide();
        $("#SettingsDiv").hide();
    }
    
    function loadMap() {
        $("#ListDiv").hide();
        $("#MapDiv").show(); 
        $("#BucketDiv").hide();
        $("#SettingsDiv").hide();
    }

    function loadBucketList() {
        $("#ListDiv").hide();
        $("#MapDiv").hide(); 
        $("#BucketDiv").show();
        $("#SettingsDiv").hide();
    }

    function loadSettings() {
        $("#ListDiv").hide();
        $("#MapDiv").hide(); 
        $("#BucketDiv").hide();
        $("#SettingsDiv").show();
    }
 
     function addTrip() {
         console.log("hello");
    }
    
      function LoginAsGuest() {
        $("#pageOne").hide();
        $("#pageTwo").show();
    }
    
    function logOutOfFacebook() {
        FB.logout(function(response) {
          // user is now logged out
        });
        //location.reload();
        loadLoginPage();
    } 
 
    </script>

    
</body>
</html>