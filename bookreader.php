<?php
	if (isset($_GET["file"]))
	{
		$file = $_GET["file"];
	} else
		header("location: google.com");
?>
<!doctype html>

<html lang="en">
<head>
	<title></title>
	<link href="css/style.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="js/jquery.scrollTo-1.4.3.1-min.js"></script>
	<script type="text/javascript" src="js/jszip/jszip.js"></script>
	<script type="text/javascript" src="js/jszip/jszip-load.js"></script>
	<script type="text/javascript" src="js/jszip/jszip-inflate.js"></script>
	<script type="text/javascript" src="js/myFuncs.js"></script>
	<script type="text/javascript" src="js/bookReader.js"></script>
</head>
<body onload="loadBook('<?php echo $file?>')">
	<div id="bookreader">
		<div id="bookNav">
			<div id="menutop" onclick="toggleTOC()"><h3>Table of Contents</h3></div>
			<ul id="chapterList">
			</ul>
		</div>
		
		<div id="bookMain" class="theBook">
		
		</div>
		<div id="bookTools">
			<div onclick="change(1)">
				<img src="images/Books/bAndW.png" alt="">
			</div>
			<div onclick="change(2)">
				<img src="images/Books/color.png" alt="">
			</div>
			<div onclick="change(3)" style="margin-left: 20%;">
				<img src="images/Books/leftNav.png" alt="">
			</div>
			<!--Page num here-->
			<div id="PageNum">
				Page <a id="currPage">1</a>/<a id="totalPage">20</a>
			</div>
			
			<div id="PageNum" onclick="bookmark(1)">
				<button>Load Bookmark</button>
			</div>
			<div id="PageNum" onclick="bookmark(2)">
				<button>Save Bookmark</button>
			</div>
			
			<div onclick="change(4)">
				<img src="images/Books/rightNav.png" alt="">
			</div>
			<div style="float:right;" onclick="change(5)">
				<img src="images/Books/large.png" alt="">
			</div>
			<div style="float:right;" onclick="change(6)">
				<img src="images/Books/medium.png" alt="">
			</div>
			<div style="float:right;" onclick="change(7)">
				<img src="images/Books/small.png" alt="">
			</div>
		</div>
		
	</div>
</body>
</html>
<!---->