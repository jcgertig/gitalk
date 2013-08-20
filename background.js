chrome.extension.onMessage.addListener(function(request, sender) { 
  if (request.command == "inject-script") { 
  	console.log("inject!");
    chrome.tabs.getCurrent(function(tab){
    	chrome.tabs.executeScript(tab.id, {file: "js/firebase.min.js"});
    	chrome.tabs.executeScript(tab.id, {file: "js/angular.min.js"});
    	chrome.tabs.executeScript(tab.id, {file: "js/angularfire.min.js"});
    	chrome.tabs.executeScript(tab.id, {file: "chat.js"});
    });
  } 
});