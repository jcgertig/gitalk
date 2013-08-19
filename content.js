;var gt = {
	username    : '',
	privaterepo : false,
	collab      : false
};
;var github = new Github({
  	username: "jcgertig",
  	password: "barker17",
  	auth: "basic"
});
gt.checkRepo = function checkRepo(url) {
	var repo = github.getRepo(url[1], url[2]);
	repo.show(isPrivate);
	gt.privaterepo = true;
	console.log(gt.privaterepo);
    return gt.privaterepo;
};

function isPrivate(err, repo){
	if (repo.private == true) {
		gt.privaterepo = true;
	}
	console.log(gt.privaterepo);
}

gt.checkCollab = function checkCollab(url) {
	gt.username = document.getElemetsByClassName('name')[0].text
	var user = github.getUser();
	user.repos(function(err, repos) {
		console.debug(repos);
	});
};

gt.openClose = function openClose(){
	var chatCont = document.getElementById('chat-wrapper');
	console.debug(chatCont);
	if(chatCont.className === 'active'){
		chatCont.className = '';
	}else{
		chatCont.className = 'active';
	}
};

gt.startChat = function startChat(){
	console.log("startChat")
};

window.onload = function() {
	var path = window.location.pathname.split("/");
	if (gt.checkRepo(path)){
		if (gt.checkCollab(path)){
			var element = document.createElement('div');
			element.innerHtml = "<div id='big-wrapper'></div>";

			$("body").append(element);
			$("#big-wrapper").load(chrome.extention.getURL("index.html"));
			gt.startChat();
		}
	}

	//var openClose = document.getElementById('open-close');
	//openClose.addEventListener('click',gt.openClose,false);
};