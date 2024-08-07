<?php

namespace Api\controllers;

use mysqli;
use services\DB;

class PostController
{
  public $conn = null;

  public function __construct()
  {
    $config = require __DIR__ . '/../config.php';

    // Create Connection
    $this->conn = (new DB($config))->database();
  }

  // Get Single Post from database
  public function getPostFromDatabase()
  {
    $postId = isset($_GET['id']) ? (int)$_GET['id'] : null;
    if (!$postId) {
      echo "Error: ID NOT ENTERED";
    }

    try {
      // Headers
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Headers: *");

      $post = null;

      // SQL to get the single post with prepared statement
      $sql = "SELECT * FROM posts WHERE id = ?";

      // Create a prepared statement
      $stmt = $this->conn->prepare($sql);
      if ($stmt === false) {
        die('Prepare failed: ' . htmlspecialchars($this->conn->error));
      }

      // Bind the parameter to the placeholder
      $stmt->bind_param("i", $postId);

      // Execute the statement
      $stmt->execute();

      // Get the result
      $response = $stmt->get_result();

      // Fetch the data
      if ($response) {
        $post = $response->fetch_assoc();
      } else {
        echo "Error: " . $sql . "<br/>" . mysqli_error($this->conn);
      }

      // Close statement and connection
      $stmt->close();
      $this->conn->close();

      // Output the result
      echo json_encode($post, JSON_PRETTY_PRINT);
    } catch (\Exception $e) {
      throw $e;
    }
  }
}
