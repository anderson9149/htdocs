<?php
//connect to mysql database on AWS
//$con = mysqli_connect("testdb.chsdaxp5cy30.us-east-1.rds.amazonaws.com", "TestDBUser", "phillesh1", "mydb") or die("Error " . mysqli_error($con));

//connect to mysql database on loaclhost
$servername = "localhost";
$username = "Developer";
$password = "password";
$dbname = "myDB";

// Create connection
$con = mysqli_connect($servername, $username, $password, $dbname) or die("Error " . mysqli_error($con));
?>