window.onload = function() {
  var lmao = browser.extension.getURL('./');
  var settingData = null;

  function blockThis() {
    document.title = settingData["title"];
    let xhr = new XMLHttpRequest();
    xhr.open('GET', lmao+'/data/theme/'+settingData["theme"]+'/index.html');
    //xhr.open('GET', 'file:///C:/cryw0rks/let-me-focus/data/theme/'+settingData["theme"]+'/index.html');
    xhr.onreadystatechange = function() {

      if (xhr.readyState !== 4) return;

      if (xhr.status === 200) {
        document.body.innerHTML = xhr.responseText;
      }
      else {
        console.log('HTTP error', xhr.status, xhr.statusText);
      }
    };

    xhr.send();
  }

  function checkList(data) {
    var currentURL = document.URL.replace(/(^\w+:|^)\/\//, '');
    currentURL = currentURL.split("/");
    currentURL = currentURL[0];
    for (var i = 0; i < data.length; i++) {
      if (data[i].url == currentURL || "www."+data[i].url == currentURL){
        blockThis()
      }
    }
  }

  function getDataWebsite() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', lmao+'/data/index.json');
    //xhr.open('GET', 'file:///C:/cryw0rks/let-me-focus/data/index.json');

    xhr.onreadystatechange = function() {

      if (xhr.readyState !== 4) return;

      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        checkList(data);
      }
      else {
        console.log('HTTP error', xhr.status, xhr.statusText);
      }
    };

    xhr.send();
  }

  function setup() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', lmao+'/data/setting.json');
    //xhr.open('GET', 'file:///C:/cryw0rks/let-me-focus/data/setting.json');

    xhr.onreadystatechange = function() {

      if (xhr.readyState !== 4) return;

      if (xhr.status === 200) {
        settingData = JSON.parse(xhr.responseText);
        if (settingData["run_lms"]) {
          getDataWebsite();
        }
      }
      else {
        console.log('HTTP error', xhr.status, xhr.statusText);
      }
    };
    
    xhr.send();
  }


  setup()
}