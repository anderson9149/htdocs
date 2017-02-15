<?php 

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
        $this->username = 'Developer';
        $this->password = 'password';
        $this->dbname = 'travelAppV1';
/*
        // Establish AWS connection
        $this->servername = 'testdb.chsdaxp5cy30.us-east-1.rds.amazonaws.com';
        $this->username = 'TestDBUser';
        $this->password = 'phillesh1';
        $this->dbname = 'mydb';
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
        echo "Connected successfully" . "<br>";

        // Create database
        $sql = "CREATE DATABASE ".$this->dbname;
        if ($conn->query($sql) === TRUE) {
            echo "Database created successfully" . "<br>";
        } else {
            echo "Error creating database: " . $conn->error . "<br>";
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
        echo "Connected successfully" . "<br>";
        
        if ($conn->query($sql) === TRUE) {
            echo "Table created successfully" . "<br>";
        } else {
            echo "Error creating table: " . $conn->error . "<br>";
        }
        $conn->close();
    }

    // Insert a row of data into the table
    function insertData( $insertEmail, $insertUserName, $insertPassword, $insertTripText, $insertArchived, $tripLocation, $insertdate, $tripdescriptionText, $insertImageLocation)
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echo "Connected successfully" . "<br>";

        $sql = "INSERT INTO UserTrips (email, username, password, tripText, archived, tripLocation, date, tripDescriptionText, imageLocation)
        VALUES ('".$insertEmail."', '".$insertUserName."', '".$insertPassword."', '".$insertTripText."', '".$insertArchived."', '".$tripLocation."', '".$insertdate."', '".$tripdescriptionText."', '".$insertImageLocation."')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
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
        echo "Connected successfully" . "<br>";

        // sql to delete a record
        $sql = "DELETE FROM UserTrips WHERE id=".$ID;

        if ($conn->query($sql) === TRUE) {
            echo "Record deleted successfully";
        } else {
            echo "Error deleting record: " . $conn->error;
        }

        $conn->close();
    }

    // Insert a row of data into the table
    function selectData( $sql )
    {
        // Create connection
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        echo "Connected successfully" . "<br>";

        $result = $conn->query($sql);

        return $result;

        $conn->close();
    }

}

?>