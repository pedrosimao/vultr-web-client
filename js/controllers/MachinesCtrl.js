/**
 * Controller MachinesCtrl
 *  Controller for the Home/Existing Machines page
 */
vultrWebClient.controller('MachinesCtrl', [
  '$scope',
  'apiService',
  function(
    $scope,
    api) {


    // @TODO: check if logged in first..
    

    $scope.servers = null;

    // retrieve the list of servers from Vultr
    api.server.list().then(
      function(servers) {
        console.log(servers);
        
        $scope.servers = servers;
      },
      function(error) {
        $scope.servers = false;
        console.log(error);

      }
    );
  }]);
