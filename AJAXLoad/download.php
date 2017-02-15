<?php
    $file = './upload/ChicagoSkyline.jpg';
    $type = 'image/jpeg';
    header('Content-Type:'.$type);
    header('Content-Length: ' . filesize($file));
    readfile($file);
?>
