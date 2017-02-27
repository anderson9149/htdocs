angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    
    .state('tabsController.tripList', {
        url: '/page2',
        views: {
                'tab1': {
                  templateUrl: 'templates/tripList.html',
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    })

    .state('tabsController.mapView', {
        url: '/page3',
        views: {
                'tab2': {
                  templateUrl: 'templates/mapView.html',
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    })
    
    .state('tabsController.addTrip', {
        url: '/page6',
        views: {
            'tab5': {
                templateUrl: 'templates/addTrip.html'//,
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    })

    .state('tabsController.bucketList', {
        url: '/page4',
        views: {
            'tab3': {
                templateUrl: 'templates/bucketList.html',
            }
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    })
    

    .state('tabsController.dashboard', {
        url: '/page7',
        views: {
            'dash-tab': {
                templateUrl: 'templates/dashboard.html',
            }
        }
    })

    .state('tabsController.settings', {
        url: '/page5',
            views: {
                'tab4': {
                     templateUrl: 'templates/settings.html',
              }
        }
    })
    
    .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract:true
    })

//$urlRouterProvider.otherwise('/page1/page2')
  // Thanks to Ben Noblet!
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("tabsController.dashboard");
  });

});