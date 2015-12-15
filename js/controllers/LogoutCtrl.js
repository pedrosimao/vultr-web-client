/**
 * Controller LogoutCtrl
 *  Controller for the logging a user out
 */
vultrWebClient.controller('LogoutCtrl', [
  '$scope',
  '$location',
  'accountService',
  'apiService',
  function(
    $scope,
    $location,
    accountService,
    api
    ) {
      // Remove the api key and redirect to the start page
      accountService.remove_key();
      $location.path('/login');
  }]);
