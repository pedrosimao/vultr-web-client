/**
 * Controller LoginCtrl
 *  Controller for the Login overlay
 */
vultrWebClient.controller('LoginCtrl', [
  '$scope',
  '$location',
  'apiService',
  function(
    $scope,
    $location,
    api
    ) {

      // Check if we have a stored key, if so redirect to the machines page
      if(api.helpers.getKey()) {
        console.log(api.helpers.getKey());
        api.accounts.list();
        api.server.list();
        $location.path('/machines');
      }

      $scope.saveKey = function() {
        api.helpers.setKey($scope.vultrKey);
        api.accounts.list();
        $location.path('/machines');
        // @TODO: Implement a test API call to check if the key is valid
      };
  }]);
