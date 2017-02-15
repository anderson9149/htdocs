<?php
if(isset($_FILES["file"]["type"]))
{
    $uploadOk = 1;

    // Check if file already exists
    if (file_exists("upload/" . $_FILES["file"]["name"])) {
        echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["file"]["size"] > 1000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Check it is a valid type
    if (($_FILES["file"]["type"] != "image/png") && ($_FILES["file"]["type"] != "image/jpg") && ($_FILES["file"]["type"] != "image/jpeg") ) {
        echo "Sorry, only JPG, JPEG & PNG files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ( ($uploadOk == 0) || ($_FILES["file"]["error"] > 0) ) {
        echo "Sorry, your file was not uploaded.";
        echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
    // if everything is ok, try to upload file
    } else {
                $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
                $targetPath = "upload/".$_FILES['file']['name']; // Target path where file is to be stored
                move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
                echo "<span id='success'>Image Uploaded Successfully...!!</span><br/>";
                echo "<br/><b>File Name:</b> " . $_FILES["file"]["name"] . "<br>";
                echo "<b>Type:</b> " . $_FILES["file"]["type"] . "<br>";
                echo "<b>Size:</b> " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
                echo "<b>Temp file:</b> " . $_FILES["file"]["tmp_name"] . "<br>";
    }  

}
?>
