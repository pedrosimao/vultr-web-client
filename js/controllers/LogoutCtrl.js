/**
 * Controller LogoutCtrl
 *  Controller for the logging a user out
 */
vultrWebClient.controller('LogoutCtrl', [
  '$scope',
  '$location',
  'apiService',
  function(
    $scope,
    $location,
    api
    ) {
      // Remove the api key and redirect to the start page
      api.helpers.removeKey();
      $location.path('/login');
  }]);
