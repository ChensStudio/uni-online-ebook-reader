<?php
//fileoperations.php

	if (isset($_GET["type"]))
	{
		if ($_GET["type"]=="del")
		{
			$filename = "../library/".$_GET["filename"];
			unlink($filename);
		}
	} else
	{
		if ($_FILES["file"]["error"] > 0)//failure
		{
			header("location: ../management.php?error=0");
		}
		else
		{
			if (file_exists("../library/" . $_FILES["file"]["name"]))//exists failure
			{
				header("location: ../management.php?error=1");
			}
			else//success
			{
				move_uploaded_file($_FILES["file"]["tmp_name"], "../library/" . $_FILES["file"]["name"]);
				//echo $_FILES["file"]["name"];
				header("location: ../library.php");
			}
		}
	}


?>