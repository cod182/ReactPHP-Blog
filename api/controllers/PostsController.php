<?php

namespace Api\controllers;

use mysqli;
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

  // Get All Posts from DB
  public function getPostsFromDatabase()
  {
    try {
      // Headers
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Headers: *");


      $perPage = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
      $pageNumber = $_GET['offset'] ?? 0;
      $postsArray = [];


      // SQL to get the total number of posts
      $sql = "SELECT * FROM posts";
      $totalPosts = mysqli_num_rows(mysqli_query($this->conn, $sql));

      // SQL to get the paginated results
      $sql = "SELECT * FROM posts ORDER BY id LIMIT $perPage OFFSET $pageNumber";
      $response = mysqli_query($this->conn, $sql);

      if ($response) {
        while ($row = mysqli_fetch_assoc($response)) {
          $postsArray['posts'][] = $row;
        }
      } else {
        echo "Error: " . $sql . "<br/>" . mysqli_error($this->conn);
      }

      $postsArray['count'] = $totalPosts;
      // Close connection
      mysqli_close($this->conn);

      echo json_encode($postsArray, JSON_PRETTY_PRINT);

      // return json_encode($postsArray, JSON_PRETTY_PRINT);
    } catch (\Exception $e) {
      //throw $th;
    }
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

  public function getSearchResults()
  {
    try {
      // Set required headers
      $this->getHeaders();

      // Set content type header for JSON response
      header('Content-Type: application/json');

      // Initialize an array to store the posts
      $postsArray = [];

      // Retrieve the keyword from the GET request
      $keyword = $_GET['keyword'] ?? null;

      // Check if a keyword was provided
      if ($keyword) {
        // Prepare the SQL statement to prevent SQL injection
        $stmt = $this->conn->prepare("SELECT id, title FROM posts WHERE title LIKE ?");
        $likeKeyword = '%' . $keyword . '%';
        $stmt->bind_param('s', $likeKeyword);

        // Execute the prepared statement
        $stmt->execute();
        $response = $stmt->get_result();

        // Check if the query was successful
        if ($response) {
          // Fetch each row and add it to the posts array
          while ($row = $response->fetch_assoc()) {
            $postsArray['posts'][] = $row;
          }
        } else {
          // Output the error message if the query failed
          http_response_code(500);
          echo json_encode(["error" => "Database query failed: " . $stmt->error]);
          return;
        }

        // Close the statement
        $stmt->close();
      }

      // Close the database connection
      $this->conn->close();

      // Output the posts array as JSON
      echo json_encode($postsArray, JSON_PRETTY_PRINT);
    } catch (\Exception $e) {
      // Ensure the connection is closed in case of an exception
      if ($this->conn) {
        $this->conn->close();
      }

      // Handle any exceptions and output error message
      http_response_code(500);
      echo json_encode(["error" => "Exception occurred: " . $e->getMessage()]);
    }
  }


  // Get required Headers
  public function getHeaders()
  {
    // Allow any origin
    header("Access-Control-Allow-Origin: *");

    // Allow credentials to be included in the request
    header("Access-Control-Allow-Credentials: true");

    // Specify how long the results of a preflight request can be cached (in seconds)
    header('Access-Control-Max-Age: 86400');

    // Specify the methods allowed when accessing the resource
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

      // If the request method is allowed
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
      }

      // If there are specific headers requested
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header('Access-Control-Allow-Headers: ' . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
      }

      // Terminate the script and return the headers
      exit(0);
    }
  }
}
