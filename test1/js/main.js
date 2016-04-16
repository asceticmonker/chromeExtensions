(function(){
  var site = '';
  var srcDict = {
    'mogujie': ['#common_goods_wall div.iwf .fill_img'],
    'baidu': ['#imgid ul li.imgitem img.main_img']
  }
  function renderDom() {
    var dom =  document.createElement('a')
    dom.id = 'aaa';
    dom.innerText = "nihao"
    document.getElementsByTagName('body')[0].appendChild(dom);
  }
  function editSrc(src) {
    if (site == 'mogujie')
      return src.replace(/.jpg_[0-9]+x[0-9]+.webp/, '.jpg');
    return src;
  }
  function getSrcs(doms) {
    var srcArr = [];
    if ($(doms).length == 0) return;
    for (var i=0, len=$(doms).length; i<len; i++) {
      var src = $(doms).eq(i).attr('src')
      if (src)
        srcArr.push(editSrc(src))
    }
    srcArr.length = 3;
    return srcArr;
  }

  function getSrc() {
    var srcArr
    var host = location.host;
    for (var pattern in srcDict) {
      if (host.indexOf(pattern) > -1) {
        var imgs = srcDict[pattern]
        for (var i=0; i<imgs.length; i++) {
          if ($(imgs[i]).length > 0) {
            site = pattern
             srcArr = getSrcs(imgs[i])
          }
        }
      }
    }
    return JSON.stringify({'imgsrcInfo': srcArr})
  }
  function sendMsg(callback) {
    console.log(213)
    var src = getSrc()
    console.log(src)
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
    console.log(info)
    if (info.greeting == "sendsrc") {
      sendMsg(sendResponse)
    }
  })

})();

