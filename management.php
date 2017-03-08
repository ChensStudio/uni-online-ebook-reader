<!doctype html>

<html lang="en">
	<head>
		<title></title>
		<link href="css/style.css" rel="stylesheet" type="text/css"/>
		<meta charset="UTF-8">
	</head>
	<body>
		<div id="management">
			<h3>Upload Ebook</h3>

			<form action="php/fileoperations.php" method="post" enctype="multipart/form-data">
				<label for="file">Filename:</label>
				<input type="file" name="file" id="file"><br>
				<input type="submit" name="submit" value="Submit">
				<?php 
					if (isset($_GET["error"]))
					{
						if ($_GET["error"]=="0")
						{
							echo "<p>Upload Error</p>";
						} else
						{
							echo "<p>File exists</p>";
						}
					}
				?>
			</form>
		</div>
	</body>
</html>