;var gt = {
	username    : '',
	privaterepo : false,
	collab      : false
};
;var github = new Github({
  	username: "",
  	password: "",
  	auth: "basic"
});
gt.checkRepo = function checkRepo(url) {
	var repo = github.getRepo(url[1], url[2]);
	repo.show(function(err, repos) {
		if (repo.private == true) {
			gt.privaterepo = true;
		}
	});
	gt.privaterepo = true;
    return gt.privaterepo;
};

gt.checkCollab = function checkCollab(url) {
	gt.username = $(".name")[0].text
	var user = github.getUser();
	user.repos(function(err, repos) {
		for (i = 0; i < repos.length; i+=1){
			if(repos[i].full_name == url[1] + "/" + url[2]){
				gt.collab = true;
				return;
			}
		}
	});
	gt.collab = true;
	return gt.collab;
};

gt.openClose = function openClose(){
	$('#chat-wrapper').toggleClass("active");
};

gt.startChat = function startChat(url){
	console.log("startChat");
	console.log(chrome.extension.getURL("index.html"));
	$('body').append("<div id='big-wrapper'></div>");
	$("#big-wrapper").load(chrome.extension.getURL("index.html"), function() {
		$("#repo-title").text(url[2]);
		$("#open-close").css({"background-image": "url('" + chrome.extension.getURL("chat-bubble.png") + "')"});
		$("#open-close").click(gt.openClose);
	});
};

window.onload = function() {
	var path = window.location.pathname.split("/");
	if (gt.checkRepo(path)){
		if (gt.checkCollab(path)){
			gt.startChat(path);
		}
	}

	//var openClose = document.getElementById('open-close');
	//openClose.addEventListener('click',gt.openClose,false);
};