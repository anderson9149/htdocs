<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

//************************************************
// Load the new trip into the data base
echoDebug( "buckettripName == " . $_GET['buckettripName'] . "\n" );
echoDebug( "latlng == " . $_GET['latlng'] . "\n");

//Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
$traveldata->createDB();
$idInserted = $traveldata->insertBucketData(    "appEmail",
                                                $_GET['buckettripName'],
                                                $_GET['latlng'] );
//************************************************

//************************************************
// Create an array of the fields added to the DB and return it as JSON to the AJAX call
// Construct the dB query to retrieve the trip info we just added
$sql = "SELECT * FROM BucketTrips WHERE ID='".$idInserted."'";

$result = $traveldata->selectData($sql);
$returnResults = array();

// Traverse the results and load them into an array 
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $returnResults[] = array (  'dbKey'=>$row["ID"],
                                    'bucketLocation'=>$row["BucketLocation"],
                                    'latlng'=>$row["latlng"],
                                    'req_date'=>$row["req_date"] );
    }
    // return the array as a json object
    echo json_encode($returnResults);
} else {
    // No Results found in the dB, so return that
    echo "0 results. Number of rows: ".$result->num_rows. " ID:" .$idInserted;
}
//************************************************

?>
