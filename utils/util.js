const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const api = "https://api.douban.com";
//星星转换成数组
function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
};
//封装请求更多页面的数据请求
function http(url, callBack) {
  //获取数据
  wx.request({
    url: url,
    method: "GET",
    header: {
      "content-Type": "application/xml"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (res) {
      console.log(res);
    },
    complete: function () {

    }
  });
}

module.exports = {
  formatTime: formatTime,
  api: api,
  convertToStarsArray: convertToStarsArray,
  http: http
}
