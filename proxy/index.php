<?php
/**
 * @file: index.php
 *
 * Used to proxy request from the Angular app to Vultr's API in
 * attempt to bypass CORS restrictions when using plain JavaScript
 */

include_once('Vultr.class.php');
$postdata = json_decode(file_get_contents("php://input"));
// $context and $action to be provided via .htaccess file
//error_reporting(0);
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

    // OS resources
    case 'os':
        switch ($action) {
            // Retrieve list of operating systems
            case 'list':
                try {
                    echo json_encode($api->os_list());
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;
        }
        break;

    // Plans resources
    case 'plans':
        switch ($action) {
            // Retrieve list of server plans
            case 'list':
                try {
                    echo json_encode($api->plans_list());
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;
        }
        break;

    // Server resources
    case 'server':
        switch ($action) {
            // Retrieve server badwidth usage
            case 'bandwidth':
                try {
                    $server_id = (isset($postdata->SUBID)) ? $postdata->SUBID : '';
                    echo json_encode($api->bandwidth($server_id));
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;
            // Create a server
            case 'create':
                try {
                    $optional_params = (isset($postdata->params)) ? $postdata->params : '';

                    $config = array(
                        'DCID' => (isset($postdata->DCID)) ? $postdata->DCID : '',
                        'VPSPLANID' => (isset($postdata->VPSPLANID)) ? $postdata->VPSPLANID : '',
                        'OSID' => (isset($postdata->OSID)) ? $postdata->OSID : '',
                        'label' => (isset($postdata->label)) ? $postdata->label : '',
                        'SCRIPTID' => (isset($optional_params->SCRIPTID)) ? $optional_params->SCRIPTID : '',
                        'SSHKEYID' => (isset($optional_params->SSHKEYID)) ? $optional_params->SSHKEYID : '',
                        'enable_ipv6' => (isset($optional_params->enable_ipv6)) ? $optional_params->enable_ipv6 : 'no',
                        'enable_private_network' => (isset($optional_params->enable_private_network)) ? $optional_params->enable_private_network : 'no',
                        'auto_backups' => (isset($optional_params->auto_backups)) ? $optional_params->auto_backups : 'no',
                    );
                    $response = json_encode($api->create($config));
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;

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

    // Snapshiot resources
    case 'snapshot':
        switch ($action) {
            // Retrieve list of snapshots
            case 'list':
                try {
                    echo json_encode($api->snapshot_list());
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;

            // Destroy a snapshot
            case 'destroy':
                try {
                    $snapshot_id = (isset($postdata->SNAPSHOTID)) ? $postdata->SNAPSHOTID : '';
                    echo json_encode($api->snapshot_destroy($snapshot_id));
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;
        }
        break;

    // SSH Key resources
    case 'sshkey':
        switch ($action) {
            // Retrieve list of operating systems
            case 'list':
                try {
                    echo json_encode($api->sshkeys_list());
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;
        }
        break;

    // Startup Script resources
    case 'startupscript':
        switch ($action) {
            // Retrieve list of operating systems
            case 'list':
                try {
                    echo json_encode($api->startupscript_list());
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;
        }
        break;

    // Regions resources
    case 'regions':
        error_log('Regions');
        switch ($action) {
            // Retrieve list of server(s)
            case 'list':
                try {
                    echo json_encode($api->regions_list());
                } catch(Exception $ex) {
                    http_response_code(400);
                }
                break;
        }
        break;

    break;
}