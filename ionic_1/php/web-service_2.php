<?php  

/* require the user as the parameter */
if(isset($_GET['user']) && intval($_GET['user'])) {

    echo 'User: ' . $_GET['user'] . '<br>' . 'Num: ' . $_GET['num'];
}

?>