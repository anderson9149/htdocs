angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){
        return {
            foo: function() {
                alert("I'm foo!");
            }
        };
}]);
