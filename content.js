window.onload = function() {
	var path = window.location.pathname;
	if (checkRepo(path)){
		if (checkCollab(path)){
			startChat();
		}
	}
};

function checkRepo(url) {
	var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'github.com/repos'+url, false );
    xmlHttp.send( null );
    obj = JSON.parse(xmlHttp.responseText);
    if (obj.private)
    	return true;
    else 
    	return false;
};

function checkCollab(url) {
	var nameDOM = document.getElemetsByClassName('name');
	var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'github.com/repos'+url+'/collaborators/'+nameDOM[0].text, false );
    xmlHttp.send( null );
    if (xmlHttp.status == 204)
    	return true;
    else 
    	return false;
};

function startChat(){
	
};