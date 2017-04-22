<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

//Create the file name and path where to store the passed image
$clientPath = "php/upload/No-Images.png";
if ($_GET['imageLocation'] != "php/upload/No-Images.png"){
    $date = new DateTime();
    $targetFileName = "anderson9194_".$date->getTimestamp();
    // Add the correct file extension
    if ($_FILES["file"]["type"] == "image/png"){
        $targetFileName = $targetFileName.".png";
    }
    if ($_FILES["file"]["type"] == "image/jpg"){
        $targetFileName = $targetFileName.".jpg";
    }
    if ($_FILES["file"]["type"] == "image/jpeg"){
        $targetFileName = $targetFileName.".jpeg";
    }
    //Create the target path where to store the image
    $targetPath = "upload/".$targetFileName;
    //Create the path to return to the client where the image is at
    $clientPath = "php/".$targetPath;
}

//************************************************
// Load the new trip into the data base
echoDebug( "tripName == " . $_GET['tripName'] . "\n" );
echoDebug( "archived == " . $_GET['archived'] . "\n");
echoDebug( "location == " . $_GET['location'] . "\n");
echoDebug( "date == " . $_GET['date'] . "\n");
echoDebug( "descriptionText == " . $_GET['descriptionText'] . "\n");
echoDebug( "latlng == " . $_GET['latlng'] . "\n");
echoDebug( "imageLocation == " . $clientPath . "\n");

//Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
$traveldata->createDB();
$idInserted = $traveldata->insertData(  $_GET['user'],
                                        "appUser",
                                        "TestPassword",
                                        $_GET['tripName'],
                                        $_GET['archived'],
                                        $_GET['location'],
                                        $_GET['date'],
                                        $_GET['descriptionText'],
                                        $_GET['latlng'],
                                        $clientPath );
//************************************************

//************************************************
// Load the photo into the file system if it was a part of the AJAX call
if(isset($_FILES["file"]["type"]))
{
    $uploadOk = 1;

    if ($clientPath == "php/upload/No-Images.png"){
        echoDebug ( " No File to Load.  Set as the default.\n" );
        $uploadOk = 0;    
    }

    // Check if file already exists
    if (file_exists($targetPath)) {
        echoDebug ( $_FILES["file"]["name"] . " invalid. Already exists.\n" );
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["file"]["size"] > 4000000) {
        echoDebug( "Sorry, your file is too large.\n");
        $uploadOk = 0;
    }

    // Check it is a valid type
    if (($_FILES["file"]["type"] != "image/png") && ($_FILES["file"]["type"] != "image/jpg") && ($_FILES["file"]["type"] != "image/jpeg") ) {
        echoDebug( "Sorry, only JPG, JPEG & PNG files are allowed.\n");
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ( ($uploadOk == 0) || ($_FILES["file"]["error"] > 0) ) {
        echoDebug( "Sorry, your file was not uploaded.");
        echoDebug( "Return Code: " . $_FILES["file"]["error"] . "\n");
    // if everything is ok, try to upload file
    } else {
        $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
        //$targetPath = "upload/".$_FILES['file']['name']; // Target path where file is to be stored
        move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
        echoDebug( "Image Uploaded Successfully...!!\n" );
        echoDebug( "File Name: " . $_FILES["file"]["name"] . "\n");
        echoDebug( "Type: " . $_FILES["file"]["type"] . "\n");
        echoDebug( "Size: " . ($_FILES["file"]["size"] / 1024) . " kB\n");
        echoDebug( "Temp file: " . $_FILES["file"]["tmp_name"] . "\n");
    }
}
//************************************************

//************************************************
// Create an array of the fields added to the DB and return is as JSON to the AJAX call
// Construct the dB query to retrieve the trip info we just added
$sql = "SELECT id, tripText, archived, tripLocation, date, tripDescriptionText, imageLocation FROM UserTrips where id='".$idInserted."'";
$result = $traveldata->selectData($sql);
$returnResults = array();

// Traverse the results and load them into an array 
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $returnResults[] = array (  'dbKey'=>$row["id"],
                                    'tripName'=>$row["tripText"],
                                    'archived'=>$row["archived"],
                                    'location'=>$row["tripLocation"] ,
                                    'date'=>$row["date"],
                                    'descriptionText'=>$row["tripDescriptionText"],
                                    'latlng'=>$_GET['latlng'],
                                    'imageLocation'=>$row["imageLocation"]);
    }
    // return the array as a json object
    echo json_encode($returnResults);
} else {
    // No Results found in the dB, so return that
    echo "0 results. Number of rows: ".$result->num_rows;
}

/*
$arr = array (  'tripName'=>$_GET['tripName'],
                'archived'=>$_GET['archived'],
                'location'=>$_GET['location'],
                'date'=>$_GET['date'],
                'descriptionText'=>$_GET['descriptionText'],
                'imageLocation'=>$clientPath);

echo json_encode($arr);
*/
//************************************************

?>
