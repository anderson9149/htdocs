<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

// Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
$traveldata->createDB();

// Construct the dB query to retrieve required info
$sql = "SELECT id, BucketLocation, latlng, reg_date FROM BucketTrips where email='appEmail'";
$result = $traveldata->selectData($sql);
$returnResults = array();

// Traverse the results and load them into an array 
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $returnResults[] = array (  'dbKey'=>$row["id"],
                                    'BucketLocation'=>$row["BucketLocation"],
                                    'latlng'=>$row["latlng"],
                                    'reg_date'=>$row["reg_date"]);
    }
    // return the array as a json object
    echo json_encode($returnResults);
} else {
    // No Results foudn in the dB, so return that
    echo "0 results";
}
?>
