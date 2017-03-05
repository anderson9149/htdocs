<?php 
require_once("./debugEcho.php");

class TravelDataAccess
{
    var $servername;
    var $username;
    var $password;
    var $dbname;

    //-----Initialization -------
    function setupDBVars()
    {

        // Establish Localhost DB connection
        $this->servername = 'localhost';
        $this->dbname = 'travelAppV1';
        $this->username = 'Developer';
        $this->password = 'password';

        $echoDebug = FALSE;
/*
        // Establish AWS connection
        $this->servername = 'travelappdbinstance1.chsdaxp5cy30.us-east-1.rds.amazonaws.com';
        $this->dbname = 'travelAppV1';
        $this->username = 'anderson9149';
        $this->password = 'phillesh1';
*/
    }
    // Create the user data base
    function createDB()
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echoDebug( "Connected successfully" . "\n" );

        // Create database
        $sql = "CREATE DATABASE ".$this->dbname;
        if ($conn->query($sql) === TRUE) {
            echoDebug( "Database created successfully" . "\n");
        } else {
            echoDebug( "Error creating database: " . $conn->error . "\n");
        }
        $conn->close();
    }

    // Create table
    function createTable($sql)
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        if($echoDebug){
            echo "Connected successfully" . "\n";
        }

        if ($conn->query($sql) === TRUE) {
            echoDebug( "Table created successfully" . "\n");
        } else {
            echoDebug( "Error creating table: " . $conn->error . "\n");
        }
        $conn->close();
    }

    // Insert a row of data into the table
    function insertData( $insertEmail, $insertUserName, $insertPassword, $insertTripText, $insertArchived, $tripLocation, $insertdate, $tripdescriptionText, $latlng, $insertImageLocation)
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echoDebug( "Connected successfully" . "\n");

        $sql = "INSERT INTO UserTrips (email, username, password, tripText, archived, tripLocation, date, tripDescriptionText, latlng, imageLocation)
        VALUES ('".$insertEmail."', '".$insertUserName."', '".$insertPassword."', '".$insertTripText."', '".$insertArchived."', '".$tripLocation."', '".$insertdate."', '".$tripdescriptionText."', '".$latlng."', '".$insertImageLocation."')";

        if ($conn->query($sql) === TRUE) {
            echoDebug( "New record created successfully");
        } else {
            echoDebug( "Error: " . $sql . "\n" . $conn->error);
        }

        echoDebug( "******************* New Record has id: " . $conn->insert_id . "\n");
        $idInserted = $conn->insert_id;

        $conn->close();

        return $idInserted;
    }

    // Insert a row of data into the BucketTrips table
    function insertBucketData( $insertEmail, $bucketLocation, $latlng)
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echoDebug( "Connected successfully" . "\n");

        $sql = "INSERT INTO BucketTrips (email, BucketLocation, latlng)
        VALUES ('".$insertEmail."', '".$bucketLocation."', '".$latlng."')";

        if ($conn->query($sql) === TRUE) {
            echoDebug( "New record created successfully");
        } else {
            echoDebug( "Error: " . $sql . "\n" . $conn->error);
        }

        echoDebug( "******************* New Record has id: " . $conn->insert_id . "\n");
        $idInserted = $conn->insert_id;

        $conn->close();

        return $idInserted;
    }

    // Insert a row of data into the table
    function deleteData( $ID )
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echoDebug( "Connected successfully" . "\n");

        // sql to delete a record
        $sql = "DELETE FROM UserTrips WHERE id=".$ID;

        if ($conn->query($sql) === TRUE) {
            echoDebug( "Record deleted successfully");
        } else {
            echoDebug( "Error deleting record: " . $conn->error);
        }

        $conn->close();
    }

    // Insert a row of data into the table
    function deleteBucketData( $ID )
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echoDebug( "Connected successfully" . "\n");

        // sql to delete a record
        $sql = "DELETE FROM BucketTrips WHERE id=".$ID;

        if ($conn->query($sql) === TRUE) {
            echoDebug( "Record deleted successfully");
        } else {
            echoDebug( "Error deleting record: " . $conn->error);
        }

        $conn->close();
    }

    // Retrieve a row of data in the table
    function selectData( $sql )
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echoDebug( "Connected successfully" . "\n");

        $result = $conn->query($sql);
        
        $conn->close();

        return $result;
    }

}

?>