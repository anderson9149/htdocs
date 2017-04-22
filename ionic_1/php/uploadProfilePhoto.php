<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

error_log("In Load Profile Photo"."\n");

//Create the file name and path where to store the passed image
$clientPath = "php/upload/No-Images.png";
if ($_GET['imageLocation'] != "php/upload/No-Images.png"){
    $date = new DateTime();
    $targetFileName = $_GET['user'].$date->getTimestamp();
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
    $targetPath = "upload/ProfilePictures/".$targetFileName;
}

//************************************************
// Load the new profile pic into the data base
error_log( "imageLocation == " . $targetPath . "\n");

//Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
$traveldata->createDB();
//************************************************
// Insert the profile photo
$dBPathUpdated = $traveldata->insertNewProfilePhoto(   $_GET['user'],
                                                    $targetPath );
error_log("dBPathUpdated = " . $dBPathUpdated);
//************************************************

//************************************************
// Load the photo into the file system if it was a part of the AJAX call
if(isset($_FILES["file"]["type"]))
{
    $uploadOk = TRUE;

    if ($clientPath == "php/upload/ProfilePictures/No-Images.png"){
        error_log ( " No File to Load.  Set as the default.\n" );
        $uploadOk = FALSE;    
    }

    // Check if file already exists
    if (file_exists($targetPath)) {
        error_log ( $_FILES["file"]["name"] . " invalid. Already exists.\n" );
        $uploadOk = FALSE;
    }

    // Check file size
    if ($_FILES["file"]["size"] > 4000000) {
        error_log( "Sorry, your file is too large.\n");
        $uploadOk = FALSE;
    }

    // Check it is a valid type
    if (($_FILES["file"]["type"] != "image/png") && ($_FILES["file"]["type"] != "image/jpg") && ($_FILES["file"]["type"] != "image/jpeg") ) {
        error_log( "Sorry, only JPG, JPEG & PNG files are allowed.\n");
        $uploadOk = FALSE;
    }

    // Check if $uploadOk is set to FALSE
    if ( ($uploadOk == FALSE) || ($_FILES["file"]["error"] > 0) ) {
        error_log( "Sorry, your file was not uploaded.");
        error_log( "Return Code: " . $_FILES["file"]["error"] . "\n");
        echo "error uploading";
    // if everything is ok, try to upload file
    } else {
        $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
        //$targetPath = "upload/".$_FILES['file']['name']; // Target path where file is to be stored
        move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
        error_log( "Image Uploaded Successfully...!!\n" );
        error_log( "File Name: " . $_FILES["file"]["name"] . "\n");
        error_log( "Type: " . $_FILES["file"]["type"] . "\n");
        error_log( "Size: " . ($_FILES["file"]["size"] / 1024) . " kB\n");
        error_log( "Temp file: " . $_FILES["file"]["tmp_name"] . "\n");
        echo $targetPath;
    }
}
//************************************************

//echo "Uploaded to File System == " . $uploadOk . " dbPathUpdated == " . $dBPathUpdated;

?>
