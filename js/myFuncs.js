function choose(j)
{
	var para = document.getElementById("bookMain").children;
	for (var i=0; i<para.length; i++ ) 
		if (para[i].className=="visible")
			break;
	para[i].className = "";
	para[j-1].className = "visible";
}