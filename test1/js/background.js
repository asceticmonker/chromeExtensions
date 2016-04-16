var srcArr = []
var times = 0;
chrome.runtime.onMessage.addListener(
  function(info, sender, sendResponse) {
    if (info == 'downloads') {
      downloads()
    } else if (info.indexOf('imgsrcInfo') > -1) {
      saveSrc(info)
      sendResponse('OK')
    }
  return true;
});
function saveSrc (info) {
  try{
    var info = JSON.parse(info)
    srcArr = info.imgsrcInfo;
  }catch(e){
    return;
  }
}
function downloads() {
  times++
  if (times == 5) return;
  if (srcArr.length == 0) {
    setTimeout( function() {
      downloads()
    }, 1000)
  } else {
    for (var i = 0; i < srcArr.length; i++) {
      downloadFile(srcArr[i])
    }
  }
  
}
function randomName() {
  var f = "";
  var a = "1234567890abcdefghijklmnopqrstuvwxyz";
  for (var i=0; i<20; i++) {
    f += a.charAt(parseInt(Math.random()*36+1))
  }
  return f;
}
function downloadFile(src) {
  chrome.downloads.download( {
    url: src,
    conflictAction: 'uniquify',
    saveAs: false,
    filename: 'mypath/'+ randomName() +'.jpg',
    headers : [
    {"name": "Referer",
    "value": "https://www.baidu.com"}
    ]
  })
}