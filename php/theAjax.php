<?php
	include_once("config.php");
	
	
	if (isset($_GET["filename"])&&isset($_GET["page"]))
	{
		$filename = $_GET["filename"];
		$page = $_GET["page"];
		
		$filename = substr($filename,0,strrpos($filename, "."));
		$filename = str_replace(' ','_',$filename);
		setcookie("$filename", "$page", time()+3600*24*1000);
		$_COOKIE["$filename"] = "$page";
			
		//setcookie("pg1065_epub", "15", time()+3600);
		//setcookie($filename, $page, $expire);
		
		print_r($_COOKIE);
		/*$query = mysql_query("SELECT * FROM bookmark WHERE filename='$filename'");
		$row = mysql_fetch_assoc($query);
		if ($row!=0)
		{
			//update
			$query = mysql_query("UPDATE bookmark SET page=$page WHERE filename='$filename'");
			echo "updated bookmark";
		} else
		{
			//insert
			$query = mysql_query("INSERT INTO bookmark(filename,page) VALUES('$filename',$page)");
			if($query)
				echo "new bookmark id:"+mysql_insert_id();
			else
				echo "fail bookmark";
			
		}*/
	} else if (isset($_GET["filename"]))
	{
		$filename = $_GET["filename"];
		$filename = substr($filename,0,strrpos($filename, "."));
		//print_r($_COOKIE); 
		$filename = str_replace(' ','_',$filename);
		if (isset($_COOKIE["$filename"]))
			echo $_COOKIE["$filename"];
		else
			echo "-1";
		/*$query = mysql_query("SELECT * FROM bookmark WHERE filename='$filename'");
		$row = mysql_fetch_assoc($query);
		if ($row!=0)
			echo $row['page'];
		else
			echo -1;*/
	}
?>