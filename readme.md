# Vultr Web Client - [VultrApp.com](https://vultrapp.com)
### A client for the admistration of [vultr](vultr.com) accounts

*Why?* - because I don't like their current one


##### Credits:
[Vultr API Client](https://github.com/usefulz/vultr-api-client)

## Local Installation
It is recommended to use [Vagrant](https://www.vagrantup.com/) and [ScotchBox](https://box.scotch.io/) for easy setup. A PHP webserver is needed to proxy Vultr API calls due to CORS restrictions in everyday browsers.

* Download and install [Vagrant](https://www.vagrantup.com/)
* Deploy a new Scotchbox instance using Vagrant
* cd into the folder you deployed scotchbox from (e.g. the folder that your Vagrantfile is in)
* git clone git@github.com:se1exin/vultr-web-client.git public (you may need to rmdir public if the folder already exists)
* cd public
* npm install
* gulp watch (to compile less and bundle assets while developing)


## Installing on Ubuntu
See issue [#15](https://github.com/se1exin/vultr-web-client/issues/15)