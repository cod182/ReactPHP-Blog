<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'api/services/DB.php';

use services\DB;

require "api/controllers/PostsController.php";

use Api\controllers\PostsController;
use Api\controllers\PostController;

// (new PostsController)->getPosts();
