/**
 * Controller MachinesCtrl
 *  Controller for the Home/Existing Machines page
 */
vultrWebClient.controller('MachinesCtrl', [
  '$rootScope',
  '$scope',
  'apiService',
  function(
    $rootScope,
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
          for(var subid in $scope.servers) {
            if($scope.servers[subid].more_info) {
              servers[subid].more_info = true;
            }
          }
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

    $scope.init = function() {
      $scope.machine_list_refresh();
      clearInterval($rootScope.machine_list_refresh_interval);
      $rootScope.machine_list_refresh_interval = setInterval($scope.machine_list_refresh, 3000);
    };

    $scope.machine_action_allowed = function(subid) {
      return $scope.servers[subid].server_state == 'ok';
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
      clearInterval($rootScope.machine_list_refresh_interval);
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'destroying';
        console.warn('Destroying ' + subid);
        api.server.destroy(subid)
          .then(function() {
            $scope.init();
          });
      }
    };

    $scope.machine_action_halt = function(subid) {
      clearInterval($rootScope.machine_list_refresh_interval);
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'halting';
        console.warn('Halting ' + subid);
        api.server.halt(subid)
          .then(function() {
            $scope.init();
          });
      }
    };

    $scope.machine_action_reboot = function(subid) {
      clearInterval($rootScope.machine_list_refresh_interval);
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'rebooting';
        console.warn('Restarting ' + subid);
        api.server.reboot(subid)
          .then(function() {
            $scope.init();
          });
      }
    };

    $scope.machine_action_reinstall = function(subid) {
      clearInterval($rootScope.machine_list_refresh_interval);
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'reinstalling';
        console.warn('Reinstalling ' + subid);
        api.server.reinstall(subid)
          .then(function() {
            $scope.init();
          });
      }
    };

    $scope.machine_action_start = function(subid) {
      clearInterval($rootScope.machine_list_refresh_interval);
      if($scope.machine_action_confirm(subid)) {
        $scope.servers[subid].status = 'starting';
        console.warn('Starting ' + subid);
        api.server.start(subid)
          .then(function() {
            $scope.init();
          });
      }
    };



    $scope.machine_more = function(subid) {
      if(!$scope.servers[subid].more_info) {
        $scope.servers[subid].more_info = true;
        $scope.info_usage(subid);
      } else {
        $scope.servers[subid].more_info = false;
      }
    };

    $scope.info_usage = function(subid) {
      console.log($scope.bandwidth)
      api.server.bandwidth(subid)
          .then(function(results) {
            $scope.bandwidth = {
              series: ['Incoming (Mb)', 'Outgoing (Mb)'],
              labels: [],
              data: [[], []]
            };
            for(var i in results.incoming_bytes) {
              $scope.bandwidth.data[0].push((results.incoming_bytes[i][1]/1024/1024));
              $scope.bandwidth.data[1].push((results.outgoing_bytes[i][1]/1024/1024));
              $scope.bandwidth.labels.push(results.incoming_bytes[i][0]);
              
            }
          });
    }


  }]);
