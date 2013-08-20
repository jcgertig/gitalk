'use strict';

var gitalk = angular.module('gitalk', ['firebase']);
//if (gt){
	var usersUrl = "https://gitalk-main.firebaseio.com/users/" + gt.repo;
	var chatUrl = "https://gitalk-main.firebaseio.com/chat/" + gt.repo;
	gitalk.controller('chatController', ['$scope', 'angularFire',
	  function ($scope, angularFire) {
		var ref = new Firebase(chatUrl);
		
		// set up the terms used in index.html
		angularFire(ref.limit(30), $scope, 'messages', {});

		// clear input field
		$scope.message = '';

		// set username
		$scope.username = gt.username;

		$scope.addMessage = function(){
			$scope.messages[ref.push().name()] = {
          		from: $scope.username,
          		text: $scope.message
        	};
        	$scope.message = "";
		}
	
	}]);
//};

function handleUsers($scope) {

}

function handleChat($scope) {
	$scope.addChat = function() {
		if (!$scope.chat.length) {
			return;
		}

		$scope.chat.push({
			from: gt.username,
			text: $scope.chat
		});
	}
}