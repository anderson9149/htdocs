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

        $echoDebug = TRUE;
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
        error_log( "Connected successfully" );

        // Create database
        $sql = "CREATE DATABASE ".$this->dbname;
        if ($conn->query($sql) === TRUE) {
            error_log( "Database created successfully" );
        } else {
            error_log( "Error creating database: " . $conn->error );
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
        error_log( "Connected successfully" );


        if ($conn->query($sql) === TRUE) {
            error_log( "Table created successfully" );
        } else {
            error_log( "Error creating table: " . $conn->error );
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
        error_log( "Connected successfully" );

        $sql = "INSERT INTO UserTrips (email, username, password, tripText, archived, tripLocation, date, tripDescriptionText, latlng, imageLocation)
        VALUES ('".$insertEmail."', '".$insertUserName."', '".$insertPassword."', '".$insertTripText."', '".$insertArchived."', '".$tripLocation."', '".$insertdate."', '".$tripdescriptionText."', '".$latlng."', '".$insertImageLocation."')";

        if ($conn->query($sql) === TRUE) {
            error_log( "New record created successfully");
        } else {
            error_log( "Error: " . $sql . "\n" . $conn->error);
        }

        error_log( "******************* New Record has id: " . $conn->insert_id );
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
        error_log( "Connected successfully" );

        $sql = "INSERT INTO BucketTrips (email, BucketLocation, latlng)
        VALUES ('".$insertEmail."', '".$bucketLocation."', '".$latlng."')";

        if ($conn->query($sql) === TRUE) {
            error_log( "New record created successfully");
        } else {
            error_log( "Error: " . $sql . "\n" . $conn->error);
        }

        error_log( "******************* New Record has id: " . $conn->insert_id );
        $idInserted = $conn->insert_id;

        $conn->close();

        return $idInserted;
    }

    // Insert a new user table
    function insertNewUserData( $newUser, $email, $password)
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        error_log( "Connected successfully" );

        $sql = "INSERT INTO Users (userName, email, password, ProfileImage)
        VALUES ('".$newUser."', '".$email."', '".$password."', 'upload/No-Images.png')";

        if ($conn->query($sql) === TRUE) {
            error_log( "New record created successfully");
        } else {
            error_log( "Error: " . $sql . "\n" . $conn->error);
        }

        error_log( "******************* New Record has id: " . $conn->insert_id );
        $idInserted = $conn->insert_id;

        $conn->close();

        return $idInserted;
    }

    // Insert a new profile picture into the table
    function insertNewProfilePhoto( $user, $profilePath)
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        error_log( "Connected successfully" );
        $insertSuccess = FALSE;

        $sql = "UPDATE Users SET ProfileImage='" . $profilePath . "' WHERE email='" . $user . "'";
        if ($conn->query($sql) === TRUE) {
            error_log( "Set the new profile path successfully: " . $profilePath);
            $insertSuccess = TRUE;
        } else {
            error_log( "Error: " . $sql . "\n" . $conn->error);
        }

        error_log( "******************* Set profile picture for id: " . $conn->insert_id );
        $conn->close();
        return $insertSuccess;
    }

    // Delete a row of data into the table
    function deleteData( $ID )
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        error_log( "Connected successfully" );

        // sql to delete a record
        $sql = "DELETE FROM UserTrips WHERE id=".$ID;

        if ($conn->query($sql) === TRUE) {
            error_log( "Record deleted successfully");
        } else {
            error_log( "Error deleting record: " . $conn->error);
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
        error_log( "Connected successfully" );

        // sql to delete a record
        $sql = "DELETE FROM BucketTrips WHERE id=".$ID;

        if ($conn->query($sql) === TRUE) {
            error_log( "Record deleted successfully");
        } else {
            error_log( "Error deleting record: " . $conn->error);
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
        error_log( "Connected successfully" );

        $result = $conn->query($sql);
        
        $conn->close();

        return $result;
    }

}

?>