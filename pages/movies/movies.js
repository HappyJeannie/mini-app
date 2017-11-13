var util = require("../../utils/util.js");
// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = "/v2/movie/in_theaters"+"?start=0&&count=3";
    var comingSoonUrl = "/v2/movie/coming_soon" + "?start=0&&count=3";
    var top250Url = "/v2/movie/top250" + "?start=0&&count=3";
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250",'top250');
  },
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    //获取数据
    wx.request({
      url: util.api + url,
      method: "GET",
      header: {
        "content-Type": "application/xml"
      },
      success: function (res) {
        console.log(res.data);
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {

      }
    });
  },
  processDoubanData: function (moviesDouban, settedKey,categoryTitle){
    //处理获取到的数据
    var movies = [];
    for (var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.lenght >= 6){
        title = title.substring(0,6)+"...";
      }
      //console.log(subject.rating.average);
      var temp = {
        title :title,
        average : subject.rating.average,
        coverageUrl : subject.images.large,
        movieId : subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    // 以下代码为javascript动态代码编写格式
    var readyData = {};
    readyData[settedKey] = {
      movies: movies,
      categoryTitle: categoryTitle
    };
    this.setData(readyData);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})