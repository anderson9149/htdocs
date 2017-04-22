<?php
require_once("./debugEcho.php");
require_once("./DBAccessClass.php");

$newUser = $_GET['newUser'];
$newEmail = $_GET['email'];
$newPassword = $_GET['userPassword'];
error_log( "newUser == " . $newUser);
error_log( "email == " . $newEmail);
error_log( "userPassword == " . $newPassword);
$validUserToCreate = TRUE;

//************************************************
// Test that the password passed in is valid
if(!empty($_POST["userPassword"]) ) {
    $password = test_input($_POST["userPassword"]);
    if (strlen($_POST["userPassword"]) <= '8') {
        //$Err = "Your Password Must Contain At Least 8 Characters!";
        $Err = "Invalid Password";
        $validUserToCreate = FALSE;
    }
    elseif(!preg_match("#[0-9]+#",$password)) {
        //$Err = "Your Password Must Contain At Least 1 Number!";
        $Err = "Invalid Password";
        $validUserToCreate = FALSE;
    }
    elseif(!preg_match("#[A-Z]+#",$password)) {
        //$Err = "Your Password Must Contain At Least 1 Capital Letter!";
        $Err = "Invalid Password";
        $validUserToCreate = FALSE;
    }
    elseif(!preg_match("#[a-z]+#",$password)) {
        //$Err = "Your Password Must Contain At Least 1 Lowercase Letter!";
        $Err = "Invalid Password";
        $validUserToCreate = FALSE;
    }
}
//************************************************

//************************************************
//Instantiate object that manages data base access
$traveldata = new TravelDataAccess();
$traveldata->setupDBVars();
//$traveldata->createDB();
//************************************************

//************************************************
// Test to see if the user name is already in the DB
/* Commenting this out.  Will allow for duplicate user names in the system
$sql = "SELECT * FROM Users WHERE userName='".$newUser ."'";
$result = $traveldata->selectData($sql);
error_log( "duplicatUsersInDB == " . $result->num_rows );
if($result->num_rows>0){
    $validUserToCreate = FALSE;
    $Err = "User Name Already exists";
}
*/
//************************************************

//************************************************
// Test to see if the email is already in the DB
// Test to see if the user name is already in the DB
$sql = "SELECT * FROM Users WHERE email='".$newEmail ."'";
$result = $traveldata->selectData($sql);
error_log( "duplicatUsersInDB == " . $result->num_rows );
if($result->num_rows>0){
    $validUserToCreate = FALSE;
    $Err = "Email Already exists";
}
//************************************************

//************************************************
// if the inputs have passed the tests, create the user
if($validUserToCreate){
    //************************************************
    // Insert the new user
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
                                        'newUser'=>$row["userName"],
                                        'email'=>$row["email"],
                                        'userPassword'=>$row["password"] );
        }
        // return the array as a json object
        echo json_encode($returnResults);
    } else {
        // No Results found in the dB, so return that
        echo "Error creating valid user";
    }
    //************************************************
}else{
    echo $Err;
}
?>
