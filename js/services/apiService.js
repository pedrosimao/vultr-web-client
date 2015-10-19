/**
 * apiService - A wrapper around Vultr API calls
 */
vultrWebClient.factory('apiService', [
  '$http',
  '$q',
  function(
    $http,
    $q) {

      var helpers = {};

      // Endpoints.
      var accounts = {};
      var app = {};
      var backup = {};
      var dns = {};
      var iso = {};
      var os = {};
      var plans = {};
      var regions = {};
      var server = {};
      var snapshot = {};
      var sshkey = {};
      var startupscript = {};


      // Initialisation..
      var vultrKey = localStorage.getItem("vultr-key");

      /**
       * Helper methods.
       */
      helpers.getKey = function() {
        return vultrKey;
      };
      helpers.setKey = function(key) {
        localStorage.setItem("vultr-key", key);
        vultrKey = key;
      };
      helpers.removeKey = function() {
        console.warn('Logging out');
        localStorage.removeItem("vultr-key");
        vultrKey = null;
      };

      /****************************************
       * API ENDPOINT IMPLEMENTATIONS
       ****************************************/

      /**
       * Account resource (..theres only currently one)
       */
      accounts.list = function() {
        return $http.post('/proxy/account/info',
            {
              'api_key': vultrKey
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
        $http.post('/proxy/os/list',
            {
              'api_key': vultrKey
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
        $http.post('/proxy/plans/list',
            {
              'api_key': vultrKey
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
        $http.post('/proxy/server/create',
            {
              'api_key': vultrKey,
              'DCID': dcid,
              'OSID': osid,
              'VPSPLANID': vpsplanid,
              'label': label,
              'params': optional_params
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
       * server.list() - Get a list of server(s)
       * @param subid - optional Server ID to return a single server
       */
       server.list = function(subid) {
        var d = $q.defer();
        $http.post('/proxy/server/list',
            {
              'api_key': vultrKey,
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
        $http.post('/proxy/server/destroy',
            {
              'api_key': vultrKey,
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
        $http.post('/proxy/server/halt',
            {
              'api_key': vultrKey,
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
        $http.post('/proxy/server/reboot',
            {
              'api_key': vultrKey,
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
        $http.post('/proxy/server/reinstall',
            {
              'api_key': vultrKey,
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
        $http.post('/proxy/server/start',
            {
              'api_key': vultrKey,
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
       * SSH Key resources
       **********************************/
       /**
        * sshkey.list() - Get a list of SSH Keys
        */
       sshkey.list = function() {
        var d = $q.defer();
        $http.post('/proxy/sshkey/list',
            {
              'api_key': vultrKey
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
        $http.post('/proxy/startupscript/list',
            {
              'api_key': vultrKey
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
        $http.post('/proxy/regions/list',
            {
              'api_key': vultrKey
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
        helpers: helpers,
        accounts: accounts,
        os: os,
        plans: plans,
        server: server,
        sshkey: sshkey,
        startupscript: startupscript,
        regions: regions
      };

  }]);