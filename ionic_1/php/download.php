<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

// Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
$traveldata->createDB();
$Email = $_GET['User'];

// Construct the dB query to retrieve required info
$sql = "SELECT id, tripText, archived, tripLocation, date, tripDescriptionText, latlng, imageLocation FROM UserTrips where email='".$Email ."'";
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
                                    'latlng'=>$row["latlng"],
                                    'imageLocation'=>$row["imageLocation"]);
    }
    // return the array as a json object
    echo json_encode($returnResults);
} else {
    // No Results foudn in the dB, so return that
    echo "0 results";
}
?>
