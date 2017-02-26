<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

//************************************************
// Delete the sent trip from the data base
echoDebug( "dbKey == " . $_GET['dbKey'] . "\n" );

//Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
$traveldata->createDB();
// Delete a row of data using the ID key
$traveldata->deleteBucketData( $_GET['dbKey'] );

echo "Key To Delete: ". $_GET['dbKey'];
//************************************************

//************************************************
// Delete the image file associated with the sent trip
// excpet if it is the default image No-Images.png
$file = $_GET['imageToDelete'];
if ($file != "php/upload/No-Images.png"){
    $file = ltrim($file,"php/");
    if (!unlink($file))
      {
      echo ("Error deleting $file");
      }
    else
      {
      echo ("Deleted $file");
      }
}
//************************************************

?>
