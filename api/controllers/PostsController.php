<?php

namespace Api\controllers;

use services\DB;

class PostsController
{
  public $conn = null;

  public function __construct()
  {
    $config = require __DIR__ . '/../config.php';

    // Create Connection
    $this->conn = (new DB($config))->database();
  }

  // Get posts from API
  public function getPosts()
  {
    try {
      // Define URLs
      $postsUrl = 'https://jsonplaceholder.typicode.com/posts';
      $photosUrl = 'https://jsonplaceholder.typicode.com/photos';

      // Initialize CURL for posts
      $ch = curl_init();
      curl_setopt_array($ch, [
        CURLOPT_URL => $postsUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_HEADER => false,
        CURLOPT_ENCODING => ''
      ]);

      // Initialize CURL for photos
      $chImg = curl_init();
      curl_setopt_array($chImg, [
        CURLOPT_URL => $photosUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_HEADER => false,
        CURLOPT_ENCODING => ''
      ]);

      // Execute CURL requests
      $responseData = curl_exec($ch);
      $responseImages = curl_exec($chImg);

      // Check for CURL errors
      if (curl_errno($ch) || curl_errno($chImg)) {
        throw new \Exception('CURL Error: ' . curl_error($ch) . ' | ' . curl_error($chImg));
      }

      // Decode JSON responses
      $responseData = json_decode($responseData, true);
      $responseImages = json_decode($responseImages, true);

      // Close CURL handles
      curl_close($ch);
      curl_close($chImg);

      $newArray = [];
      // Combine Data
      foreach ($responseData as $resData) {
        $resData['image'] = null; // Default to null if no image found
        foreach ($responseImages as $resImage) {
          if ($resImage['id'] == $resData['id']) {
            $resData['image'] = $resImage['url'];
            break;
          }
        }
        $newArray[] = $resData;
      }

      // $this->savePostsToDB($newArray);

    } catch (\Exception $e) {
      echo 'Error: ' . $e->getMessage();
    }
  }

  // Save posts to DB from API
  public function savePostsToDB($posts = null)
  {
    if ($posts === null) {
      return;
    }

    // Prepare SQL statement
    $stmt = $this->conn->prepare("INSERT INTO posts (user_id, content, title, image) VALUES (?, ?, ?, ?)");

    if (!$stmt) {
      echo 'Prepare failed: ' . $this->conn->error;
      return;
    }

    // Insert Data into DB
    foreach ($posts as $post) {
      $stmt->bind_param(
        'isss',
        $post['userId'],
        $post['body'],
        $post['title'],
        $post['image']
      );

      if ($stmt->execute()) {
        echo "New Record created\n";
      } else {
        echo "Error: " . $stmt->error . "\n";
      }
    }

    // Close statement and connection
    $stmt->close();
    $this->conn->close();
  }
}
