<?php  

/* require the user as the parameter */
if(isset($_GET['user']) && intval($_GET['user'])) {

    echo ' hello world <br>';
    echo $_GET['user'] . ' <br>';
    echo $_GET['num']. ' <br>';
    }

$to = "panderson9194@gmail.com";
$subject = "My subject";
$txt = "Hello world!";
$headers = "From: webmaster@example.com" . "\r\n" .
"CC: somebodyelse@example.com";

if ( mail($to,$subject,$txt,$headers) ) {
    echo $to . $subject . $txt . $headers;
    echo "Have a good day!";
}

/*
if( mail($to,$subject,$txt,$headers) ) {
    echo $to . $subject . $txt . $headers;
}else{
    echo 'did not send";
}
*/
?>