var theFilename = "";

/**
 * Compare a string or regular expression against all of the filenames and
 * return an informational object for each that matches.
 * @param   string/regex The regular expression to test against
 * @return  An array of objects representing the matched files. In the form
 *          {name: "filename", data: "file data", dir: true/false}
 */
JSZip.prototype.findlast = function(needle)
{
   var result = -1;
   for (var filename in this.files)
   {
		if (filename.indexOf(needle)>0)
		{
			result = this.files[filename]
		}
   }
   return result;
};


function toggleTOC()
{
	/*if (bTOC==0)
	{
		bTOC = 1;
		document.getElementById("chapterList").className = "";
	} else
	{
		bTOC = 0;
		document.getElementById("chapterList").className = "hide";
	}*/
}

function loadChapter()
{
	alert(this.id);
}

function loadBook(filename)
{
	theFilename = filename;
	var xhr2_blob = new XMLHttpRequest();
	xhr2_blob.open('GET', 'library/'+filename, true);
	xhr2_blob.responseType = 'blob';

	xhr2_blob.onreadystatechange = function(e) 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
		  var elt = document.getElementById('chapterList');
		  var bookContent = document.getElementById('bookMain');
		  bookContent.innerHTML = "";
		  elt.innerHTML = "";
		  var reader = new FileReader();
		  reader.onload = function (e) 
		  {
			var zip = new JSZip(e.target.result);
			
			for(var current in zip.files)
			{
				if (current.indexOf("toc.ncx")>-1)
				{
					sLyn = zip.files[current].data.toString();

					xmlDoc = createXmlDocument(sLyn);
					
					navPoints = xmlDoc.getElementsByTagName("text");
					contents = xmlDoc.getElementsByTagName("content");
					
					for (var i=1; i<navPoints.length; i++)
					{
						tName = "";
						tSrc = "";
						if (navPoints[i].textContent)
							tName = navPoints[i].textContent;
						else 
							tName = navPoints[i].innerText;
						tSrc = contents[i-1].getAttribute("src");
						
						//alert(tSrc);
						boolAddedYet = 0;
						tLink = "";
						if (tSrc.indexOf("OEBPS")>-1)
						{
							tLink = tSrc.substr(tSrc.lastIndexOf("/")+1);
							theText = zip.files[tSrc].data.toString();
							if (theText.length>650)
								bookContent.innerHTML += "<div id='"+tLink+"'>"+theText+"</div>";
							else
							{
								tLink = tLink.substr(0, tSrc.indexOf("_"));
								findlastFile = zip.findlast(tLink);
								
								if (findlastFile!=-1)
									bookContent.innerHTML += "<div id='"+tLink+"'>"+findlastFile.data.toString()+"</div>";
							}
							tLink = "#"+tLink;
						}
						else	
						{
							if (boolAddedYet==0)
							{
								tLink = tSrc.substr(tSrc.indexOf("#"));
								tSrc = tSrc.substr(0,tSrc.indexOf("#"));
								bookContent.innerHTML += zip.findlast(tSrc).data.toString();
								boolAddedYet = 1;
							}
						}
						elt.innerHTML += "<li><a href='"+tLink+"'>"+tName+"</a></li>";
					}
				}
			}
			checkForImg(zip);
		  };
		  reader.readAsArrayBuffer(this.response);
		}
	};

	xhr2_blob.send();	
}


function checkForImg(theZip)
{
	var el = document.getElementById('bookMain');
	imgs = el.getElementsByTagName("img");
	for (i=0; i<imgs.length; i++)
	{
		findlastFile = theZip.findlast(imgs[i].getAttribute("src"));						
		if (findlastFile!=-1)
		{
			var imageData = findlastFile.asBinary();
			imgs[i].src =  'data:image/jpeg;base64,' + btoa(imageData);
		}
	}
	document.getElementById("currPage").innerHTML = "1";
	document.getElementById("totalPage").innerHTML = Math.ceil($("#bookMain")[0].scrollHeight/610);
}	

function createXmlDocument(string)
{
    var doc;
    if (window.DOMParser)
    {
        parser = new DOMParser();
        doc = parser.parseFromString(string, "application/xml");
    }
    else // Internet Explorer
    {
        doc = new ActiveXObject("Microsoft.XMLDOM");
        doc.async = "false";
        doc.loadXML(string); 
    }
    return doc;
}

function change(i)
{
	if (i==1)
	{
		document.getElementById("bookMain").className = "theBook";
	} else if(i==2)
	{
		document.getElementById("bookMain").className = "theBook2";
	} else if(i==3)
	{
		//alert("going back");
		$("#bookMain").scrollTo( '-=610px', 0);
		document.getElementById("currPage").innerHTML = Math.ceil($("#bookMain").scrollTop()/610)+1;
		document.getElementById("totalPage").innerHTML = Math.ceil($("#bookMain")[0].scrollHeight/610);
	} else if (i==4)
	{
		//alert("going froward");
		$("#bookMain").scrollTo( '+=610px', 0);
		document.getElementById("currPage").innerHTML = Math.ceil($("#bookMain").scrollTop()/610)+1;
		document.getElementById("totalPage").innerHTML = Math.ceil($("#bookMain")[0].scrollHeight/610);
	} else if (i>4)
	{
		var div = document.getElementById("bookMain");
		if (i==5)
			div.style.fontSize = "25px";
		else if (i==6)
			div.style.fontSize = "16px";
		else
			div.style.fontSize = "12px";
	} 
}

function goToPage(i)
{
	i = (i-1)*610;
	$("#bookMain").scrollTo( i+'px', 0);
	document.getElementById("currPage").innerHTML = Math.ceil($("#bookMain").scrollTop()/610)+1;
	document.getElementById("totalPage").innerHTML = Math.ceil($("#bookMain")[0].scrollHeight/610);
}

function bookmark(i)
{
//alert("started"+ theFilename);
	if (i==1)
	{
		//alert("Loading"+ theFilename);
		if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
			else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				page = xmlhttp.responseText;
				//alert("responsetext: "+page);
				if (page>-1)
				{
					goToPage(page);
				} else
					alert("no bookmark found");
			}
		}
		xmlhttp.open("GET","./php/theAjax.php?filename="+theFilename,false);
		xmlhttp.send();
	} else
	{
		//alert("saving");
		page = document.getElementById("currPage").innerHTML;
		if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
			else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				alert("responsetext: "+xmlhttp.responseText);
				//alert(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET","./php/theAjax.php?filename="+theFilename+"&page="+page,false);
		xmlhttp.send();
	}
}












