/**
 * apiService - A wrapper around Vultr API calls
 */
vultrWebClient.factory('apiService', [
  'accountService',
  '$rootScope',
  '$http',
  '$q',
  function(
    accountService,
    $rootScope,
    $http,
    $q) {
      // Endpoints.
      var accounts= {},
          app= {},
          backup= {},
          dns= {},
          iso= {},
          os= {},
          plans= {},
          regions= {},
          server= {},
          snapshot= {},
          sshkey = {},
          startupscript = {};

      // API base url
      var url_prefix = '/proxy/';

      /****************************************
       * API ENDPOINT IMPLEMENTATIONS
       ****************************************/

      /**
       * Account resource (..theres only currently one)
       */
      accounts.list = function() {
        return $http.post(url_prefix + 'account/info',
            {
              'api_key': accountService.get_key()
            }
          )
          .then(function(response) {
            console.log(response);
          }, function(error) {
            console.log(error);
          });
      };

      /***********************************
       * OS resources
       **********************************/
       /**
        * os.list() - Get a list of oses
        */
       os.list = function() {
        var d = $q.defer();
        $http.post(url_prefix + 'os/list',
            {
              'api_key': accountService.get_key()
            }
          )
          .then(function(response) {
            d.resolve(response.data);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /***********************************
       * Plans resources
       **********************************/
       /**
        * plans.list() - Get a list of oses
        */
       plans.list = function() {
        var d = $q.defer();
        $http.post(url_prefix + 'plans/list',
            {
              'api_key': accountService.get_key()
            }
          )
          .then(function(response) {
            d.resolve(response.data);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /***********************************
       * Server resources
       **********************************/
      /**
       * server.bandwidth() - Get a la server's bandwidth usage
       * @param subid - Server ID of server to get bandwidth for
       */
       server.bandwidth = function(subid) {
        var d = $q.defer();
        $http.post(url_prefix + 'server/bandwidth',
            {
              'api_key': accountService.get_key(),
              'SUBID': subid
            }
          )
          .then(function(response) {
            console.log(response);
            d.resolve(response.data);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /**
       * server.create() - Create a new server
       * @param dcid - Location/Regions ID to deploy instance to
       * @param osid - Operating System ID to use for server install
       * @param vpsplanid - VPS Plan ID to use for server type
       * @param optional_params - Optional additional params
       */
       server.create = function(dcid,
                                osid,
                                vpsplanid,
                                label,
                                optional_params) {
        var d = $q.defer();
        $http.post(url_prefix + 'server/create',
            {
              'api_key': accountService.get_key(),
              'DCID': dcid,
              'OSID': osid,
              'VPSPLANID': vpsplanid,
              'label': label,
              'params': optional_params
            }
          )
          .then(function(response) {
            console.log(response);
            d.resolve(response);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };
      /**
       * server.list() - Get a list of server(s)
       * @param subid - optional Server ID to return a single server
       */
       server.list = function(subid) {
        var d = $q.defer();
        $http.post(url_prefix + 'server/list',
            {
              'api_key': accountService.get_key(),
              'SUBID': subid
            }
          )
          .then(function(response) {
            d.resolve(response.data);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /**
       * server.destroy() - Destory a server
       * @param subid - Server ID to destroy
       */
       server.destroy = function(subid) {
        var d = $q.defer();
        $http.post(url_prefix + 'server/destroy',
            {
              'api_key': accountService.get_key(),
              'SUBID': subid
            }
          )
          .then(function(response) {
            d.resolve(response);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /**
       * server.halt() - Halt a server
       * @param subid - Server ID to halt
       */
       server.halt = function(subid) {
        var d = $q.defer();
        $http.post(url_prefix + 'server/halt',
            {
              'api_key': accountService.get_key(),
              'SUBID': subid
            }
          )
          .then(function(response) {
            d.resolve(response);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /**
       * server.reboot() - Reboot a server
       * @param subid - Server ID to reboot
       */
       server.reboot = function(subid) {
        var d = $q.defer();
        $http.post(url_prefix + 'server/reboot',
            {
              'api_key': accountService.get_key(),
              'SUBID': subid
            }
          )
          .then(function(response) {
            d.resolve(response);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /**
       * server.reinstall() - Reinstall a server
       * @param subid - Server ID to reinstall
       */
       server.reinstall = function(subid) {
        var d = $q.defer();
        $http.post(url_prefix + 'server/reinstall',
            {
              'api_key': accountService.get_key(),
              'SUBID': subid
            }
          )
          .then(function(response) {
            d.resolve(response);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /**
       * server.start() - Start a server
       * @param subid - Server ID to start
       */
       server.start = function(subid) {
        var d = $q.defer();
        $http.post(url_prefix + 'server/start',
            {
              'api_key': accountService.get_key(),
              'SUBID': subid
            }
          )
          .then(function(response) {
            d.resolve(response);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /***********************************
       * Snapshot resources
       **********************************/

      /**
       * snapshot.list() - Get a list of snapshots
       */
       snapshot.list = function() {
        var d = $q.defer();
        $http.post(url_prefix + 'snapshot/list',
            {
              'api_key': accountService.get_key()
            }
          )
          .then(function(response) {
            d.resolve(response.data);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /**
       * snapshot.destroy() - Destory a snapshot
       * @param snapshot_id - Snapshot ID to destroy
       */
       snapshot.destroy = function(snapshot_id) {
        var d = $q.defer();
        $http.post(url_prefix + 'snapshot/destroy',
            {
              'api_key': accountService.get_key(),
              'SNAPSHOTID': snapshot_id
            }
          )
          .then(function(response) {
            d.resolve(response);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };


      /***********************************
       * SSH Key resources
       **********************************/
       /**
        * sshkey.list() - Get a list of SSH Keys
        */
       sshkey.list = function() {
        var d = $q.defer();
        $http.post(url_prefix + 'sshkey/list',
            {
              'api_key': accountService.get_key()
            }
          )
          .then(function(response) {
            d.resolve(response.data);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      /***********************************
       * Startup Script resources
       **********************************/

      /**
       * startupscript.list() - Get a list of startup scripts
       */
       startupscript.list = function() {
        var d = $q.defer();
        $http.post(url_prefix + 'startupscript/list',
            {
              'api_key': accountService.get_key()
            }
          )
          .then(function(response) {
            d.resolve(response.data);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };


      /***********************************
       * Region resources
       **********************************/
       /**
       * regions.list() - Get a list of regions
       */
       regions.list = function() {
        var d = $q.defer();
        $http.post(url_prefix + 'regions/list',
            {
              'api_key': accountService.get_key()
            }
          )
          .then(function(response) {
            d.resolve(response.data);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };



      // Public functions
      return {
        accounts: accounts,
        os: os,
        plans: plans,
        server: server,
        snapshot: snapshot,
        sshkey: sshkey,
        startupscript: startupscript,
        regions: regions
      };

  }]);