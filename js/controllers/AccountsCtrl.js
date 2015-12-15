/**
 * Controller AccountsCtrl
 *  Controller for the accounts page
 */
vultrWebClient.controller('AccountsCtrl', [
  '$rootScope',
  '$scope',
  'apiService',
  function(
    $rootScope,
    $scope,
    api
    ) {
      api.accounts.list();
  }]);
