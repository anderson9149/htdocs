<?php  
require_once("./DBAccessClass.php");

//Instantiate object that manages data base access
$traveldata = new TravelDataAccess();

$traveldata->setupDBVars();
$traveldata->createDB();

// Create a table in the data base
$sql = "CREATE TABLE UserTrips (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
email VARCHAR(50) NOT NULL,
username VARCHAR(50),
password VARCHAR(50),
tripText VARCHAR(50),
archived BOOL,
tripLocation VARCHAR(50),
date VARCHAR(50),
tripDescriptionText VARCHAR(50),
latlng VARCHAR(50),
imageLocation VARCHAR(50),
reg_date TIMESTAMP
)";
$traveldata->createTable($sql);

// Insert a row of data
//$traveldata->insertData( "testEmail", "TestUser", "TestPassword", "Test Trip Text", FALSE, "Test Trip Location", "Test Trip Date", "Test Trip Description", "Test Image Location");
//$traveldata->insertData( "testEmail", "TestUser2", "TestPassword", "Test Trip Text", FALSE, "Test Trip Location", "Test Trip Date", "Test Trip Description", "Test Image Location");

// Delete a row of data using the ID key
//$traveldata->deleteData( "1" );

//(email, username, password, tripText, archived, tripLocation, date, tripDescriptionText, imageLocation)
$sql = "SELECT email, username, password FROM UserTrips where username='TestUser2'";
$result = $traveldata->selectData($sql);

if ($result->num_rows > 0) {
    echo "<table><tr><th>ID</th><th>Name</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["email"]."</td><td>".$row["username"]." ".$row["password"]."</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

/*
if (isset($_POST['submitted'])) {
  $traveldata->setupDBVars();
  $traveldata->createDB();
  $traveldata->createTable();
  $traveldata->insertData($_POST['name'],$_POST['email'],$_POST['username'],$_POST['password']);
}
*/

?>

