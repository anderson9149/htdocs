<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

//************************************************
// Load the new trip into the data base
error_log( "newUser == " . $_GET['newUser']);
error_log( "email == " . $_GET['email']);
error_log( "userPassword == " . $_GET['userPassword']);

//Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
//$traveldata->createDB();
$idInserted = $traveldata->insertNewUserData(   $_GET['newUser'],
                                                $_GET['email'],
                                                $_GET['userPassword'] );
error_log("idInserted = " . $idInserted);
//************************************************

//************************************************
// Create an array of the fields added to the DB and return it as JSON to the AJAX call
// Construct the dB query to retrieve the trip info we just added
$sql = "SELECT * FROM Users WHERE ID='".$idInserted."'";

$result = $traveldata->selectData($sql);
$returnResults = array();

// Traverse the results and load them into an array 
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $returnResults[] = array (  'dbKey'=>$row["ID"],
                                    'newUser'=>$row["newUser"],
                                    'email'=>$row["email"],
                                    'userPassword'=>$row["userPassword"] );
    }
    // return the array as a json object
    echo json_encode($returnResults);
} else {
    // No Results found in the dB, so return that
    echo "0 results. Number of rows: ".$result->num_rows. " ID:" .$idInserted;
}
//************************************************

?>
