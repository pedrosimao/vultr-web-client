/**
 * Controller DeployCtrl
 *  Controller for the Deploy Server page
 */
vultrWebClient.controller('DeployCtrl', [
  '$rootScope',
  '$scope',
  '$location',
  'apiService',
  function(
    $rootScope,
    $scope,
    $location,
    api) {

    // @TODO: check if logged in first..

    // make sure the machine refresh interval is killed. its not needed here.
    clearInterval($rootScope.machine_list_refresh_interval);
    
    $scope.show_additional = false;
    $scope.server_deploying = false;
    $scope.data = {
      plan_type: null,
      region: 'loading',
      os: 'loading',
      plan: 'empty',
      features: [],
      sshkey: [],
      startupscript: 'loading',
      label: ''
    };
    $scope.regions = [
      {
        'DCID': 'loading',
        'name': 'Loading Regions..'
      }
    ];
    $scope.oses = [
      {
        'OSID': 'loading',
        'name': 'Loading OSes..'
      }
    ];
    $scope.plans = [
      {
        'VPSPLANID': 'empty',
        'name': 'Select Region First..'
      }
    ];
    $scope.sshkeys = [
      {
        'SSHKEYID': 'loading',
        'name': 'Loading SSH Keys..'
      }
    ];
    $scope.startupscripts = [
      {
        'SCRIPTID': 'loading',
        'name': 'Loading Startup Scripts..'
      }
    ];
    $scope.features = [
      {
        'feature': 'ipv6',
        'name': 'IPv6'
      },
      {
        'feature': 'private_network',
        'name': 'Private Network'
      },
      {
        'feature': 'backups',
        'name': 'Auto Backups'
      }
    ];

    $scope.set_plan_type = function(type) {
      $scope.data.plan_type = type;
      $scope.regions_list_refresh();
      $scope.os_list_refresh();
      $scope.plan_list_refresh();
      console.log($scope.data.features);
    };

    $scope.set_additional = function() {
      if(
          ($scope.data.region !== null && $scope.data.region != 'loading') &&
          ($scope.data.os !== null && $scope.data.os != 'loading') &&
          ($scope.data.plan !== null && $scope.data.plan != 'loading')
        ) {
        $scope.show_additional = true;
        $scope.sshkey_list_refresh();
        $scope.startupscripts_list_refresh();
      } else {
        $scope.show_additional = false;
      }
    };

    /*****************************************
     * Change handlers for Chosen dropdowns
     ******************************************/
    $scope.select_region_changed = function() {
      $scope.plan_list_refresh();
      $scope.set_additional();
    };

    $scope.select_os_changed = function() {
      $scope.set_additional();
    };

    $scope.select_plan_changed = function() {
      $scope.set_additional();
    };


    /********************************
     * API calls
     *********************************/
    $scope.regions_list_refresh = function() {
      // retrieve the list of regions from Vultr
      api.regions.list().then(
        function(regions) {
          if(regions === null) {
            return;
          }
          console.log(regions);
          $scope.regions = regions;
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.os_list_refresh = function() {
      // retrieve the list of oses from Vultr
      api.os.list().then(
        function(oses) {
          if(oses=== null) {
            return;
          }
          console.log(oses);
          $scope.oses = oses;
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.sshkey_list_refresh = function() {
      // retrieve the list of oses from Vultr
      api.sshkey.list().then(
        function(sshkeys) {
          console.log(sshkeys);
          if(sshkeys === null) {
            return;
          } else if(sshkeys.length === 0) {
            $scope.sshkeys = [
              {
                'SSHKEYID': 'empty',
                'name': 'No SSH keys found..'
              }
            ];
            $scope.data.sshkey = 'empty';
          } else {
            $scope.sshkeys = sshkeys;
          }
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.startupscripts_list_refresh = function() {
      // retrieve the list of oses from Vultr
      api.startupscript.list().then(
        function(startupscripts) {
          console.log(startupscripts);
          if(startupscripts === null) {
            error_log('null');
            return;
          } else if(startupscripts.length === 0) {
            $scope.startupscripts = [
              {
                'SCRIPTID': 'empty',
                'name': 'No startup scripts found..'
              }
            ];
            $scope.data.startupscript = 'empty';
          } else {
            $scope.startupscripts = startupscripts;
          }
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.plan_list_refresh = function() {
      // retrieve the list of plans from Vultr
      $scope.plans = [{
          'VPSPLANID': 'loading',
          'name': 'Loading Plans..'
      }];
      $scope.data.plan = 'loading';
      api.plans.list().then(
        function(plans) {
          $scope.data.plan = null;
          $scope.plans = {};
          if(plans === null) {
            return;
          }

          for(var i in plans) {
            // filter out plans that aren't in our our selected options
            var plan = plans[i];
            if(
              ($scope.data.plan_type !== null && $scope.data.plan_type == plan.plan_type) &&
              ($scope.data.region !== null && plan.available_locations.indexOf(parseInt($scope.data.region)) != -1)
              ) {
                plan.name = plan.name.replace(/,/g, ', ');
                plan.name = plan.name.replace(/.00/g, '');
                $scope.plans[i] = plan;
            }
          }
          if(!Object.keys($scope.plans).length) {
            $scope.plans = [{
              'VPSPLANID': 'empty',
              'name': 'Select Region First..'
            }];
            $scope.data.plan = 'empty';
          }
        },
        function(error) {
          console.log(error);
        }
      );
    };


  $scope.deploy_server = function() {
    console.warn('Deploying new server..');
    $scope.server_deploying = true;
    // Sanity checks.. Angular should take care of the majority of validation.
    
    var params = {};

    // Set Features params
    if($scope.data.features.indexOf('ipv6') != -1) {
      params.enable_ipv6 = 'yes';
    }
    if($scope.data.features.indexOf('private_network') != -1) {
      params.enable_private_network = 'yes';
    }
    if($scope.data.features.indexOf('backups') != -1) {
      params.auto_backups = 'yes';
    }

    // Set SSH Key params
    if($scope.data.sshkey != 'loading' && $scope.data.sshkey != 'empty') {
      params.SSHKEYID = '';
      for(var i in $scope.data.sshkey) {
        params.SSHKEYID = $scope.data.sshkey[i] + ',';
        // remove trailing comma
        params.SSHKEYID = params.SSHKEYID.replace(/,+$/, ""); 
      }
    }

    // Set Startup Script param
    if($scope.data.startupscript != 'loading' && $scope.data.startupscript != 'empty') {
      params.SCRIPTID = $scope.startupscript;
    }

    api.server.create(
      $scope.data.region,
      $scope.data.os,
      $scope.data.plan,
      $scope.data.label,
      params)
      .then(function() {
        $location.path('/machines');
      });
    
  };

}]);