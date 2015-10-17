<?php
/**
 * @file: index.php
 *
 * Used to proxy request from the Angular app to Vultr's API in
 * attempt to bypass CORS restrictions when using plain JavaScript
 */
error_log('init');
include_once('Vultr.class.php');
$postdata = json_decode(file_get_contents("php://input"));
// $context and $action to be provided via .htaccess file
error_reporting(0);
$context = $_GET['context'];
$action = $_GET['action'];
$api = new Vultr($postdata->api_key);
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
            // Retrieve list of server(s)
            case 'list':
                try {
                    $server_id = (isset($postdata->SUBID)) ? $postdata->SUBID : '';
                    echo json_encode($api->server_list($server_id));
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;

            // Destroy a server
            case 'destroy':
                try {
                    $server_id = (isset($postdata->SUBID)) ? $postdata->SUBID : '';
                    echo json_encode($api->destroy($server_id));
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;

            // Halt a server
            case 'halt':
                try {
                    $server_id = (isset($postdata->SUBID)) ? $postdata->SUBID : '';
                    echo json_encode($api->halt($server_id));
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;

            // Reboot a server
            case 'reboot':
                try {
                    $server_id = (isset($postdata->SUBID)) ? $postdata->SUBID : '';
                    echo json_encode($api->reboot($server_id));
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;

            // Reinstall a server
            case 'reinstall':
                try {
                    $server_id = (isset($postdata->SUBID)) ? $postdata->SUBID : '';
                    echo json_encode($api->reinstall($server_id));
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;

            // Start a server
            case 'start':
                try {
                    $server_id = (isset($postdata->SUBID)) ? $postdata->SUBID : '';
                    echo json_encode($api->start($server_id));
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;
        }
        break;

    break;
}