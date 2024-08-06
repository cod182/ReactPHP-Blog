<?php


namespace Api;

error_reporting(E_ALL);
ini_set('display_errors', '1');

class Api
{
  public static function routing($current_link, $urls)
  {
    try {
      foreach ($urls as $index => $url) {
        if ($index != $current_link) {
          continue;
        }

        // Get controller and method
        $routeElement = explode('@', $url[0]);

        $className = $routeElement[0];
        $function = $routeElement[1];

        // Check if controller present
        if (!file_exists('controllers/' . $className . '.php')) {
          return "Controller not found";
        }

        $class = "api\controllers\\$className";
        $object = new $class();

        $object->$function();
      }
    } catch (\Exception $e) {
      //throw $th;
    }
  }
}
