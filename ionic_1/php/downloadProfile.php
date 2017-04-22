<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

// Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
$traveldata->createDB();
$Email = $_GET['User'];
error_log("Get Profile Image from email: " . $Email);

// Construct the dB query to retrieve required info
$sql = "SELECT ProfileImage FROM Users where email='".$Email ."'";
$result = $traveldata->selectData($sql);

if($row = $result->fetch_assoc()){
    echo $row["ProfileImage"];
} else {
    echo "0 results";
}

/*
$returnResults = array();

// Traverse the results and load them into an array 
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $returnResults[] = array ( 'ProfilePicture'=>$row["ProfileImage"] );
    }
    // return the array as a json object
    echo json_encode($returnResults);
} else {
    // No Results foudn in the dB, so return that
    echo "0 results";
}
*/
?>
