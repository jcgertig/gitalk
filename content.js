
;var github = null;
;var gt = {
	username    : null,
	privaterepo : null,
	collab      : null,
	url         : null
};

//Pull github user info from sync
gt.getFromStorage = function getFromStorage(func){
	function callback(result){
		func( result );
	}
	chrome.storage.sync.get(["github_username", "github_password"], callback);
};

//Check if repo is private
gt.checkRepo = function checkRepo(func) {
	var repo = github.getRepo(gt.url[1], gt.url[2]);
	function callback(err, repos){
		func( err, repos );
	}
	repo.show(callback);
};

//Check if a user is a collaborator
gt.checkCollab = function checkCollab(func) {
	var user = github.getUser();
	function callback(err, repos){
		func( err, repos );
	}
	user.repos(callback);
};

//Create new Github object
function dealWithUserInfo(result){
	if (!result.github_username || !result.github_password) {
		alert("Your Github user info is missing! Please enter it in gitalk's options page.");
    	return;
    }
	gt.username = result.github_username;
    github = new Github({
  		username: result.github_username,
  		password: Base64.decode(result.github_password),
  		auth: "basic"
	});
}

//Set Global vars
function dealWithRepo(err, repos){
	if(!err) {
		gt.privaterepo = repos.private;
	} else {
		gt.privaterepo = false;
	}
}

//Set Global vars
function dealWithCollab(err, repos) {
	if(!err) {
		for (i = 0; i < repos.length; i+=1){
			if(repos[i].full_name == gt.url[1] + "/" + gt.url[2]){
				gt.collab = true;
				return;
			}
		}
	}
	gt.collab = false;
}

gt.openClose = function openClose(){
	$('#chat-wrapper').toggleClass("active");
};

gt.startChat = function startChat(){
	console.log("startChat");
	$('body').append("<div id='big-wrapper'></div>");
	$("#big-wrapper").load(chrome.extension.getURL("index.html"), function() {
		$("#repo-title").text(gt.url[2]);
		$("#open-close").css({"background-image": "url('" + chrome.extension.getURL("chat-bubble.png") + "')"});
		$("#open-close").click(gt.openClose);
	});
};

window.onload = function() {
	gt.getFromStorage(dealWithUserInfo);
	var intvl1 = setInterval(function() {
    	if (github !== null) { 
        	clearInterval(intvl1);

			gt.url = window.location.pathname.split("/");

			gt.checkRepo(dealWithRepo);
			var intvl2 = setInterval(function() {
		    	if (gt.privaterepo !== null) { 
		        	clearInterval(intvl2);
		        	if(gt.privaterepo) {
		        		gt.checkCollab(dealWithCollab);
		        		var intvl3 = setInterval(function() {
		    				if (gt.collab !== null) { 
		        				clearInterval(intvl3);
		        				if(gt.privaterepo) {
		        					gt.startChat();
		        				}
		    				}
						}, 100);
		        	}
		    	}
			}, 100);
		}
	}, 100);
};