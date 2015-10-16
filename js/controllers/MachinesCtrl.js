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
    $scope.servers_loading = true;
    $scope.servers_error = false;

    $scope.machine_list_refresh = function() {
      // retrieve the list of servers from Vultr
      api.server.list().then(
        function(servers) {
          console.log(servers);
          $scope.servers_loading = false;
          $scope.servers = servers;
        },
        function(error) {
          $scope.servers_error = true;
          $scope.servers_loading = false;
          console.log(error);

        }
      );
    };


    /*************************************
     * Server action/management functions
     *************************************/
    $scope.machine_action_console = function(subid) {
      console.warn('Opening console for ' + subid);
      window.open($scope.servers[subid].kvm_url);
    };
     
    $scope.machine_action_destroy = function(subid) {
      console.warn('Destroying ' + subid);
      api.server.destroy(subid)
        .then(function() {
          $scope.machine_list_refresh();
        });
    };

    $scope.machine_action_halt = function(subid) {
      console.warn('Halting ' + subid);
      api.server.halt(subid)
        .then(function() {
          $scope.machine_list_refresh();
        });
    };

    $scope.machine_action_restart = function(subid) {
      console.warn('Restarting ' + subid);
      api.server.restart(subid)
        .then(function() {
          $scope.machine_list_refresh();
        });
    };

    $scope.machine_action_start = function(subid) {
      console.warn('Starting ' + subid);
      api.server.start(subid)
        .then(function() {
          $scope.machine_list_refresh();
        });
    };
  }]);
