angular.module('app.directives', [])

.directive('fileSelect', [function(){
  var template = '<input type="file" name="files" onchange="angular.element(this).scope().file_changed(this)" accept="image/*" />';
  return function( scope, elem, attrs ) {
    var selector = $( template );
    elem.append(selector);
    selector.bind('change', function( event ) {
      scope.$apply(function() {
        scope[ attrs.fileSelect ] = event.originalEvent.target.files;
      });
    });
    scope.$watch(attrs.fileSelect, function(file) {
      selector.val(file);
    });
  };
}]);
