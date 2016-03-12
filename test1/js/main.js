(function(){
  function renderDom() {
    var dom =  document.createElement('a')
    dom.id = 'aaa';
    dom.innerText = "nihao"
    document.getElementsByTagName('body')[0].appendChild(dom);
  }

  function getSrc() {
    var srcArr = [];
    // var imgs = document.getElementsByClassName('J_dynamic_img ');
     var imgs = document.getElementsByTagName('img ');
    for (var i=0; i<imgs.length; i++) {
      var src = imgs[i].src;
      if (src) {
          srcArr.push(src.replace(/_[0-9x]+\.webp/, ''));
      }
      else continue;
    }
    if (srcArr.length == 0) return null;
    return JSON.stringify({'imgsrcInfo': srcArr})
  }
  function sendMsg(callback) {
    var src = getSrc()
    if (!src) callback('no img!')
    else {
      chrome.runtime.sendMessage(src, function(response) {
        console.log(response)
        // callback(response)
      });
      callback('OK')
    }
  }
  renderDom()
  chrome.runtime.onMessage.addListener( function(info, sender, sendResponse) {
    if (info.greeting == "sendsrc") {
      sendMsg(sendResponse)
    }
  })

})();

