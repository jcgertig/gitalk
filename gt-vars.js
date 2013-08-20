;var gt = {
	username    : null,
	repo        : null
};

(function(){
	var url = window.location.pathname.split("/");
	gt.repo = url[1] + "/" + url[2];
	gt.username = $(".name")[0].text;
})();