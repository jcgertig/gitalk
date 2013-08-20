// Saves options to sync.
function save_options() {
  var select = document.getElementById("username");
  var username = select.value;
  chrome.storage.sync.set({'github_username': username});

  select = document.getElementById("password");
  var password = select.value;
  chrome.storage.sync.set({'github_password': Base64.encode(password)});

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "User info saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from sync.
function restore_options() {
  chrome.storage.sync.get(["github_username", "github_password"], function(result){
    var username = result.github_username;
    var password = result.github_password;
    if (!username || !password) {
      return;
    }

    var select = document.getElementById("username");
    select.value = username;
    select = document.getElementById("password");
    select.value = Base64.decode(password);
  });
  
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);