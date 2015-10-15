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
        $http.get('/proxy/account/info?api_key='+vultrKey)
          .success(function(response) {
            console.log(response);
          }, function(error) {
            console.log(response);
          });
      };


      /**
       * Server resource
       *
       * @param subid - option Server ID to return a single server
       */

       server.list = function(subid) {
        var d = $q.defer();
        $http.get('/proxy/server/list?api_key='+vultrKey+'&?SUBID='+subid)
          .success(function(response) {
            d.resolve(response);
          }, function(error) {
            d.reject(response);
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