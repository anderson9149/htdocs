<?php
//connect to mysql database
/*
$servername = "localhost";
$username = "Developer";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
*/



//connect to mysql database on loaclhost
$servername = "localhost";
$username = "Developer";
$password = "password";
$dbname = "myDB";

// Create connection
$con = new mysqli($servername, $username, $password, $dbname) or die("Error " . mysqli_error($con));
?>