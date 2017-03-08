<?php
// Connection's Parameters
	
	//$db_host="localhost";
	//$db_name="larcsthg_mainbase";
	//$db_username="larcsthg_develop";
	//$db_password="Tukkies910623";
	
	$db_host="localhost";
	$db_name="onlinebook";
	$db_username="root";
	$db_password="";
	
	$db_con = mysql_connect($db_host,$db_username,$db_password);
	$connection_string=mysql_select_db($db_name);
// Connection
	mysql_connect($db_host,$db_username,$db_password) or die ("Couldn't Connect");
	mysql_select_db($db_name) or die ("Couldn't find database!");
?>