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
      var ssh = {};
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
        return $http.get('/proxy/account/info?api_key='+vultrKey)
          .then(function(response) {
            console.log(response);
          }, function(error) {
            console.log(error);
          });
      };


      /***********************************
       * Server resources
       **********************************/

      /**
       * server.list() - Get a list of server(s)
       * @param subid - optional Server ID to return a single server
       */
       server.list = function(subid) {
        var d = $q.defer();
        $http.get('/proxy/server/list?api_key='+vultrKey+'&SUBID='+subid)
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
        $http.get('/proxy/server/destroy?api_key='+vultrKey+'&SUBID='+subid)
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
        $http.get('/proxy/server/halt?api_key='+vultrKey+'&SUBID='+subid)
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
        $http.get('/proxy/server/reboot?api_key='+vultrKey+'&SUBID='+subid)
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
        $http.get('/proxy/server/start?api_key='+vultrKey+'&SUBID='+subid)
          .then(function(response) {
            d.resolve(response);
          }, function(error) {
            d.reject(error);
          });
        return d.promise;
      };

      // Public functions
      return {
        helpers: helpers,
        accounts: accounts,
        server: server
      };

  }]);