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

    $scope.machine_action_allowed = function(subid) {
      return $scope.servers[subid].status == 'active';
    };

    $scope.machine_action_confirm = function(subid) {
      if($scope.machine_action_allowed(subid)) {
        return confirm('Are you sure?');
      }
    };

    /*************************************
     * Server action/management functions
     *************************************/
    $scope.machine_action_console = function(subid) {
      console.warn('Opening console for ' + subid);
      window.open($scope.servers[subid].kvm_url);
    };
     
    $scope.machine_action_destroy = function(subid) {
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'destorying';
        console.warn('Destroying ' + subid);
        api.server.destroy(subid)
          .then(function() {
            $scope.machine_list_refresh();
          });
      }
    };

    $scope.machine_action_halt = function(subid) {
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'halting';
        console.warn('Halting ' + subid);
        api.server.halt(subid)
          .then(function() {
            $scope.machine_list_refresh();
          });
      }
    };

    $scope.machine_action_reboot = function(subid) {
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'rebooting';
        console.warn('Restarting ' + subid);
        api.server.reboot(subid)
          .then(function() {
            $scope.machine_list_refresh();
          });
      }
    };

    $scope.machine_action_reinstall = function(subid) {
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'reinstalling';
        console.warn('Reinstalling ' + subid);
        api.server.reinstall(subid)
          .then(function() {
            $scope.machine_list_refresh();
          });
      }
    };

    $scope.machine_action_start = function(subid) {
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'starting';
        console.warn('Starting ' + subid);
        api.server.start(subid)
          .then(function() {
            $scope.machine_list_refresh();
          });
      }
    };



    $scope.machine_more = function(subid) {
      if(!$scope.servers[subid].more_info) {
        $scope.servers[subid].more_info = true;
      } else {
        $scope.servers[subid].more_info = false;
      }
    };


  }]);
