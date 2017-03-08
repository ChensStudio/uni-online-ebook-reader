<?php 

 //open this directory 
$dir = opendir("../library");

// get each entry
while($file = readdir($dir)) 
{
	if (strlen($file)>2)
	{
		$zip = new ZipArchive; 
		if ($zip->open('../library/'.$file) == TRUE) 
		{ 
			for($i = 0; $i < $zip->numFiles; $i++) 
			{   
				$str = $zip->getNameIndex($i);
				if (strpos($str, 'content.opf')>-1)
				{
					$contents = $zip->getFromName($str);
					$pos1 = strpos($contents,'<dc:title>')+10;
					$pos2 = strpos($contents,'</dc:title>');
					$title = substr($contents,$pos1,$pos2-$pos1);
					$pos1 = strpos($contents,'<dc:creator');
					$pos2 = strpos($contents,'</dc:creator>');
					$author = substr($contents,$pos1,$pos2-$pos1);
					$author = substr($author,strpos($author,'>')+1);
					$pos1 = strpos($contents,'<spine');
					$pos2 = strpos($contents,'</spine>');
					$spine = substr($contents,$pos1,$pos2-$pos1);
					$spine = substr_count($spine,"itemref");
					
					$pos1 = strpos($contents,'<dc:date');
					$pos2 = strpos($contents,'</dc:date>');
					$date = substr($contents,$pos1,$pos2-$pos1);
					
					
					echo $title."|||".$author."|||".$spine."|||".$date."|||".$file."###";
				}
			}
		}
	}
}
closedir($dir);

?>