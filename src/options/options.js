//Checkbox JS (Enable/disable)
var hide = document.getElementsByName("hide-nsfw")[0];
var only = document.getElementsByName("only-nsfw")[0];
hide.addEventListener("click", hidensfwclick);
only.addEventListener("click", onlynsfwclick);

function hidensfwclick(){
  if (hide.checked)
  {
    only.disabled = true;
  }
  else
  {
    only.disabled = false;
  }
}

function onlynsfwclick(){
  if (only.checked)
  {
    hide.disabled = true;
  }
  else
  {
    hide.disabled = false;
  }
}

// Saves options to chrome.storage
function save_options() {
    var hideOption = hide.checked;
    var onlyOption = only.checked;
    chrome.storage.sync.set({
      hide: hideOption,
      only: onlyOption
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      hide: false,
      only: false
    }, function(items) {
      only.checked = items.only;
      hide.checked = items.hide;
      if (hide.checked)
      {
        only.disabled = true;
      }
      else if (only.checked)
      {
        hide.disabled = true;
      }
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);