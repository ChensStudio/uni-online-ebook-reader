var arrBooks;



function checkbook()
{
	alert("Filename: "+theBook);
}
//get the books with ajax
$(document).ready(function(){
	$.get('php/library.php', function(data) 
	{
		var sLyn = data;
		arrBooks = sLyn.split("###");
		for (i=0; i<arrBooks.length-1; i++)
			arrBooks[i] = arrBooks[i].split("|||");
		book = "";
		bookDivs = [];
		sHTML = "";
		for (i=0; i<arrBooks.length-1; i++)
		{
			var sName = arrBooks[i][0];
			if (sName.length>13)
			{
				sName = sName.substr(0,15)+"...";
			}
			if (i<5)//============Ass4
				bookDivs.push("<a class='aBook' href='bookreader.php?file="+arrBooks[i][4]+"' onmouseover='dynPopup("+i+");' onmouseout='tooltip.hide();'><p class='par'>"+sName+"</p></a><a class='deletebtn' filename='"+arrBooks[i][4]+"'></a>");
			else//============Ass4
				bookDivs.push("<a class='aBookBot' href='bookreader.php?file="+arrBooks[i][4]+"' onmouseover='dynPopup("+i+");' onmouseout='tooltip.hide();'><p class='par'>"+sName+"</p></a><a class='deletebtn' filename='"+arrBooks[i][4]+"'></a>");
		}
			
		i = 0;
		sHTML = "<div class='libraryTop'><div id='board'>My Bookshelf</div><div id='books'>";
		while(i<5 && i<bookDivs.length)
		{
			sHTML += bookDivs[i];
			i++;
		}
		sHTML += "</div></div>";
		while(i<bookDivs.length)
		{
			if (i%5==0)
				sHTML += "<div class='libraryShelf'><div id='books'>";
			sHTML += bookDivs[i];
			if (i%9==0)
				sHTML += "</div></div>";
			i++;
		}
		$('#library').html(sHTML);
		$(".aBook").hover(function(){ $(this).find(".par").toggleClass('rotate35'); });
		$(".aBookBot").hover(function(){ $(this).find(".par").toggleClass('rotate35'); });
		//============Ass4
		$('.deletebtn').on('click', function () 
		{
			if (confirm('Are you sure you want to delete this book?'))
			{
				var fn = $(this).attr("filename");
				if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
					else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						setTimeout("location.reload(true);",0);
					}
				}
				xmlhttp.open("GET","./php/fileoperations.php?type=del&filename="+fn,false);
				xmlhttp.send();
				
			}
			else
			{
				alert('no');
			}
		});
	});
});

function dynPopup(i)
{
	author = arrBooks[i][1];
	chapters = arrBooks[i][2];
	pubDate = arrBooks[i][3];
	sMsg = "<span style='font-size:14px;'>Info</span></br>";
	sMsg += arrBooks[i][0]+"</br>";
	sMsg += "Author    : "+author+"</br>";
	sMsg += "Publication Date  : "+pubDate+"</br>";
	sMsg += "Chapter Count: "+chapters+"</br>";
	tooltip.show(sMsg,200);
}

