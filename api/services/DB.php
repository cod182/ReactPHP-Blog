<?php

namespace services;


$config = require __DIR__ . '/../config.php';

use mysqli;

class DB
{
  private $dbHost;
  private $dbUser;
  private $dbPass;
  private $dbDatabase;

  // Constructor to initialize the database configuration
  public function __construct(array $config)
  {
    $this->dbHost = $config['db_host'];
    $this->dbUser = $config['db_user'];
    $this->dbPass = $config['db_pass'];
    $this->dbDatabase = $config['db_database'];
  }

  public function database()
  {
    // Create connection
    $conn = new mysqli($this->dbHost, $this->dbUser, $this->dbPass, $this->dbDatabase);

    // Check connection
    if ($conn->connect_error) {
      die('Connection error: ' . $conn->connect_error);
    }

    return $conn;
  }
}

// Instantiate and use the DB class
$db = new \services\DB($config);
$conn = $db->database();
