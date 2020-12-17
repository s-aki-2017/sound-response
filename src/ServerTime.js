var client = document.getElementById('client');
var server = document.getElementById('server');
var tokyo2020 = document.getElementById('tokyo2020');
var request = new XMLHttpRequest();
var limitDate = new Date('2020/07/24 20:00');
var timer;
client.textContent = new Date();
request.open('HEAD', window.location.href, true);
request.send();
request.onreadystatechange = function() {
  if (this.readyState === 4) {
    var serverDate = new Date(request.getResponseHeader('Date'));
    server.textContent = serverDate;
    var rTime = (limitDate - serverDate) / 1000;
    var addZero = function(n) {
      return ('0' + n).slice(-2);
    }
    var gDate = function(rTime) {
      var rDay = Math.floor(rTime / (60 * 60 * 24));
      var rHour = Math.floor(rTime / (60 * 60)) - (rDay * 24);
      var rMin = addZero(Math.floor(rTime / (60)) - (rDay * 24 * 60) - (rHour * 60));
      var rSec = addZero(Math.floor(rTime) - (rDay * 24 * 60 * 60) - (rHour * 60 * 60) - (rMin * 60));
      rDay = rDay ? rDay + '日' : '';
      rHour = rHour ? rHour + '時間' : '';
      rMin = rMin !== '00' ? rMin + '分' : '';
      tokyo2020.textContent = rDay + rHour + rMin + rSec + '秒';
    }
    gDate(rTime);
    timer = setInterval(function() {
      if (rTime > 0) {
        gDate(rTime);
        rTime--;
      } else {
        clearInterval(timer);
        tokyo2020.textContent = '開催中';
      }
    }, 1000);
  }
}