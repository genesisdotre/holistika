app.controller("DetailCtrl", function($location, $scope, overlay) {

  $scope.img = $location.search().url

  $scope.$on("$destroy", function() {
    renderer.domElement.remove()
    overlay.hide();
  })

});