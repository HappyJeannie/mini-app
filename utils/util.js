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

function convertToStrigArray(stars){
  var num = stars.toString().tosubstrig(0,1);
  console.log(num);
  var array = [];
  for(var i = 1; i < 5; i ++){
    if(i <= num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
};

module.exports = {
  formatTime: formatTime,
  api : api,
  convertToStrigArray: convertToStrigArray
}
