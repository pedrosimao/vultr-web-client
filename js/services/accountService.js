/**
 * accountService - Provides access to stored Vultr Account API keys
 */
vultrWebClient.factory('accountService', [
  '$http',
  function(
    $http
    ) {

    // Initialisation..
    var vultr_key = localStorage.getItem("vultr-key");
    var vultr_accounts = localStorage.getItem("vultr-accounts");
    if(!vultr_accounts) {
      vultr_accounts = [];
    } else {
      vultr_accounts = JSON.parse(vultr_accounts);
    }

    /**
     * function get_key() - Get the current active Vultr API key
     */
    var get_key = function() {
      return vultr_key;
    };

    /**
     * function set_key() - Set the current active Vultr API key
     */
    var set_key = function(key) {
      localStorage.setItem("vultr-key", key);
      vultr_key = key;
    };

    /**
     * function remove_key() - [DEPRECATED] delete the current active Vultr API key
     * @TODO: Replace/add with remove_account
     */
    var remove_key = function() {
      console.warn('Logging out');
      localStorage.removeItem("vultr-key");
      vultr_key = null;
    };


    var login = function(email, password) {
      return $http.post('https://my.vultr.com',
        {
          'action': 'login',
          'username': email,
          'password': password
        }
      )
      .then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
    };


    /**
     * function add() - Add a new Vultr API key (and name)
     * @return: FALSE if the API key is already know. TRUE otherwise.
     */
    var add = function(key, name) {

      var key_found = false;

      // check if account exists
      for(var i in vultr_accounts) {
        if(vultr_accounts[i].key == key) {
          key_found = true; // Key already exists
          break;
        }
      }

      if(!key_found) {
        vultr_accounts.push({
          key: key,
          name: name
        });

        // set local storage
        localStorage.setItem('vultr-accounts', JSON.stringify(vultr_accounts));
        
        // if vultr_key is false then this is the first time
        // an account has been added - set this one to the currently active account
        if(!vultr_key) {
          set_key(key);
        }
      }

      return !key_found;
    };

    var get = function() {
      return vultr_accounts;
    };

    return {
      get_key: get_key,
      set_key: set_key,
      remove_key: remove_key,
      
      login: login,

      add: add,
      get: get
    };

  }]);