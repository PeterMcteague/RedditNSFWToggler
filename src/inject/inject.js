//Issue currently is that we're now left with few videos most of the time.

//We could get more by loading the html of the second page and appending any that are HD too, until the page is full (40 videos.)
//This can cause issues if the pages are updated. But as long as we check for duplicates, it shouldn't be too bad.

var nsfwOnlyVar;
var sfwOnlyVar;

function sfwOnly(htmlIn)
{
	//Now we need to remove the non-hd videos from the document.
	for (i = 0; i < htmlIn.length; i++) 
	{
		var html = htmlIn[i].innerHTML;
		if (html.indexOf('nsfw</span>') != -1)
		{				
			htmlIn[i].parentElement.removeChild(htmlIn[i]);
		}
	}
}

function nsfwOnly(htmlIn)
{
	//Now we need to remove the non-hd videos from the document.
	for (i = 0; i < htmlIn.length; i++) 
	{
		var html = htmlIn[i].innerHTML;
		if (html.indexOf('nsfw</span>') == -1)
		{				
			htmlIn[i].parentElement.removeChild(htmlIn[i]);
		}
	}
}

function update()
{
	var scrollerItems = document.querySelectorAll('div.scrollerItem');
	if (nsfwOnlyVar)
	{
		nsfwOnly(scrollerItems);
	}
	else if (sfwOnlyVar)
	{
		sfwOnly(scrollerItems);
	}
}

chrome.extension.sendMessage({}, function(response) 
{
	var readyStateCheckInterval = setInterval(function() {
		clearInterval(readyStateCheckInterval);	
		var scrollerItems = document.querySelectorAll('div.scrollerItem');
		if (document.readyState === "complete") {
			/*Get options*/
			chrome.storage.sync.get({
				hide: false,
				only: false
			}, function(items) {
				if (items.only)
				{
					nsfwOnlyVar = items.only;
					nsfwOnly(scrollerItems);
				}
				else if (items.hide)
				{
					sfwOnlyVar = items.hide;
					sfwOnly(scrollerItems);
				}
			});
		}
	}, 10);
});

/*Detect when new items are loaded*/
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.9) {
        update();
    }
};