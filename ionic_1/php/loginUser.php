<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

$Email = $_GET['email'];
$Password = $_GET['userPassword'];
error_log( "login email == " . $Email);
error_log( "login userPassword == " . $Password);
$validLogin = 0;

//************************************************
//Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
//$traveldata->createDB();
//************************************************

//************************************************
// look up the email address in the DB
$sql = "SELECT * FROM Users WHERE email='".$Email ."'";
$result = $traveldata->selectData($sql);
// Traverse the results and check 
if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if($row["password"] == $Password)
            $validLogin = 1;
    }
//************************************************

error_log( "Valid Login == " . $validLogin );
echo $validLogin;
?>
