<?php
/**
 * @file: index.php
 *
 * Used to proxy request from the Angular app to Vultr's API in
 * attempt to bypass CORS restrictions when using plain JavaScript
 */

include_once('Vultr.class.php');

// $context and $action to be provided via .htaccess file
$context = $_GET['context'];
$action = $_GET['action'];

$api = new Vultr($_GET['api_key']);

switch($context) {

    // Account resources
    case 'account':
        switch($action) {
            // Get info on the user's account
            case 'info':
                echo json_encode($api->account_info());
                break;
        }
        break;

    // Vultr App resources
    case 'app':
        switch ($action) {
            case 'list':
                echo json_encode($api->app_list());
                break;
        }
        break;

    // Server resources
    case 'server':
        switch ($action) {
            case 'list':
                $server_id = (isset($_GET['SUBID'])) ? $_GET['SUBID'] : '';
                echo json_encode($api->server_list($server_id));
                break;
        }
        break;

}