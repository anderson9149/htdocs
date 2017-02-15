<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title> Register and Login App </title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" >
<!--        <script src="js/jquery-1.10.2.js"></script> -->
        <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="css/bootstrap.min.css?v=<?=time();?>" type="text/css" />
<!--	<link rel="stylesheet" href="css/myStyle.css" type="text/css" /> -->
</head>
<body>

<nav class="navbar navbar-default" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar1">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="index.php">Register and Login App</a>
		</div>
		<div class="collapse navbar-collapse" id="navbar1">
			<ul class="nav navbar-nav navbar-right">
				<?php if (isset($_SESSION['usr_id'])) { ?>
				<li><p class="navbar-text">Signed in as <?php echo $_SESSION['usr_name']; ?></p></li>
				<li><a href="logout.php">Log Out</a></li>
				<?php } else { ?>
				<li><a href="login.php">Login</a></li>
				<li><a href="register.php">Sign Up</a></li>
				<?php } ?>
			</ul>
		</div>
	</div>

<p>Envelope icon: <span class="glyphicon glyphicon-envelope"></span></p> 
<p>Search icon: <span class="glyphicon glyphicon-search"></span></p>
<p>Print icon: <span class="glyphicon glyphicon-print"></span></p>

<!--
        <nav class="navbar navbar-inverse navbar-fixed-bottom" >
        <nav class="" > 
          <div class="container-fluid"> 
           <ul class="nav navbar-nav ul_class">
              <li class="active"><a href="#">Home</a></li>
              <li class = "li_class"><a href="#">Page 1</a></li>
              <li class = "li_class"><a href="#">Page 2</a></li>
              <li class = "li_class"><a href="#">Page 3</a></li>
            </ul>
         </div>
        </nav>
-->

    <ul class="ul_class2">
      <li class="li_class2" ><a Stlye-"display:block;" href="#home"> <span class="glyphicon glyphicon-envelope"></span> </a> </li>
      <li class="li_class2"><a href="#news">News</a></li>
      <li class="li_class2"> <a href="#contact">Contact</a></li>
      <li class="li_class2"><a href="#about">About</a></li>
    </ul>

<!--
    <ul id="ul2" class = "ul_class">
        <li class = "li_class">also a very long one</li>
        <li class = "li_class">item</li>
        <li class = "li_class">item</li>
        <li class = "li_class">item</li>
    </ul>
-->

</nav>
</body>
</html>

