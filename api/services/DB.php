<?php

namespace srvices;

use mysqli;

class DB
{
  public $db_host = 'localhost';
  public $db_user = 'root';
  public $db_password = '';
  public $db_database = 'react_php_blog';

  public function database()
  {

    // Create connection
    $conn = new mysqli($this->db_host, $this->db_user, $this->db_password, $this->db_database);

    // Check connection
    if ($conn->connect_error) {
      die('Connection error: ' . $conn->connect_error);
    }

    return $conn;
  }
};
