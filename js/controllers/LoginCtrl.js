/**
 * Controller LoginCtrl
 *  Controller for the Login overlay
 */
vultrWebClient.controller('LoginCtrl', [
  'apiService',
  '$scope', 
  function(
    api,
    $scope
    ) {
      if(!api.helpers.getKey()) {
        $scope.overlayVisible = true;
      } else {
        api.accounts.list();
        $scope.overlayVisible = false;
      }

      $scope.saveKey = function() {
        api.helpers.setKey($scope.vultrKey);
        api.accounts.list();
        // @TODO: Implement a test API call to check if the key is valid
        $scope.overlayVisible = false;
      };
  }]);
