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

    // Account related functions
    case 'account':
        switch($action) {
            // Get info on the user's account
            case 'info':
                echo json_encode($api->account_info());
                break;
        }
        break;

    case 'app':
        switch ($action) {
            case 'list':
                echo json_encode($api->app_list());
                break;
        }
        break;
}