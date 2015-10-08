/**
 * apiService - A wrapper around Vultr API calls, using restangular
 */
vultrWebClient.factory('apiService', [
  '$q',
  'Restangular',
  function(
    $q,
    Restangular) {

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
      helpers.setKey = function(vultrKey) {
        localStorage.setItem("vultr-key", vultrKey);
      };

      /****************************************
       * API ENDPOINT IMPLEMENTATIONS
       ****************************************/

      /**
       * Account endpoint (..theres only currently one)
       */
      accounts.list = function(callback) {
        Restangular.all('accounts').customGET('list', {'api_key': vultrKey})
          .then(function(response) {
            console.log(response);
          });
      };

      // Public functions
      return {
        helpers: helpers,
        accounts: accounts
      };

  }]);