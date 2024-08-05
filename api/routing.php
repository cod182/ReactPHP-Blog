<?php
require "services/DB.php";

use services\DB;


require('controllers/PostsController.php');

$config = require 'config.php';

$dbHost = $config['db_host'];
$dbUser = $config['db_user'];
$dbPass = $config['db_pass'];
$dbDatabase = $config['db_database'];


// Get current Url

$current_link = $_SERVER['REQUEST_URI'];;

// Routes

$urls = [
  '/' . $dbDatabase . '/api/posts' => ['PostsController@getPostsFromDatabase']
];
