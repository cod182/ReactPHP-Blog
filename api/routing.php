<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require "services/DB.php";

use services\DB;

use Api\Api;


require('controllers/PostsController.php');
require('controllers/PostController.php');
require('Api.php');

$config = require 'config.php';

$dbHost = $config['db_host'];
$dbUser = $config['db_user'];
$dbPass = $config['db_pass'];
$dbDatabase = $config['db_database'];

// Get current Url

$current_link = $_SERVER['REQUEST_URI'];

// Handle query
if (str_contains($current_link, '?')) {
  $current_link = explode('?', $current_link)[0];
}





// Routes

$urls = [
  '/reactphp-blog/api/posts' => ['PostsController@getPostsFromDatabase'],
  '/reactphp-blog/api/post' => ['PostController@getPostFromDatabase']

];


// Check route available

$availableRoutes = array_keys($urls);


if (!in_array($current_link, $availableRoutes)) {
  header('Http/1.0 404 Not Found');
  exit();
}

Api::routing($current_link, $urls);
