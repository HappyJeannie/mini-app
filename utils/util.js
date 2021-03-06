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
// const api = "https://api.douban.com";
const api = "https://douban.uieee.com";
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
//将各个演员信息用/符号连接
function converToCastString(casts){
  var castsjoin = "";
  for(var idx in casts){
    castsjoin = castsjoin + casts[idx].name + '/';
  }
  return castsjoin;
}
//整理各个演员的信息，包括人物图片,id和名字
function convertToCastInfos(casts){
  var castsArray = [];
  for(var idx in casts){
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large:"",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  formatTime: formatTime,
  api: api,
  convertToStarsArray: convertToStarsArray,
  http: http,
  converToCastString: converToCastString,
  convertToCastInfos: convertToCastInfos
}
