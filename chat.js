'use strict';

var gitalk = angular.module('gitalk', ['firebase']);

gitalk.controller('chatController', ['$scope', 'angularFire', 'angularFireCollection'
	function chatController($scope, angularFire, angularFireCollection) {
		var usersUrl = "https://gitalk-users.firebaseio.com/";
		var messagesUrl = "https://gitalk-messages.firebaseio.com/";

		// set up the terms used in index.html
		var userPromise = angularFire(usersUrl, $scope, 'users');
		var messagePromise = angularFire(messagesUrl, $scope, 'messages');

		// clear input field
		$scope.message = '';
		
		if (gt) {
			$scope.username = gt.username;
		} else {
			console.log("Could not find username.");
		}

		userPromise.then(function(users) {
			handleUsers($scope);
		});
		messagePromise.then(function(messages) {
			handleMessages($scope);
		});
	}
]);

function handleUsers($scope) {

}

function handleMessages($scope) {
	$scope.addMessage = function() {
		if (!$scope.message.length) {
			return;
		}

		$scope.messages.push({
			from: $scope.username,
			text: $scope.message
		});
	}
}