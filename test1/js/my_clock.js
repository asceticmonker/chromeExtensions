function my_clock(el){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m=m>=10?m:('0'+m);
    s=s>=10?s:('0'+s);
    el.innerHTML = h+":"+m+":"+s;
    setTimeout(function(){my_clock(el)}, 1000);
}
function sendToBg() {
  chrome.runtime.sendMessage('downloads', function(response) {

  });
}

var btn = document.getElementById('downloads')
var clock_div = document.getElementById('clock_div');
my_clock(clock_div);

btn.addEventListener('click', function() {

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: "sendsrc"
    }, function(response) {
      if (response == "OK") {
        sendToBg()
      } else {
        console.log('error')
      }
    });
  });
})
