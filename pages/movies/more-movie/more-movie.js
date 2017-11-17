var util = require("../../../utils/util.js");
// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    navigateTitle:"",
    totalCount:0,
    requestUrl:"",
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      category: category
    });
    console.log(options);
    var dataUrl = "";
    switch (category){
      case "正在热映":
        dataUrl ="https://api.douban.com/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl ="https://api.douban.com/v2/movie/coming_soon";
        break;
      case "top250":
        dataUrl ="https://api.douban.com/v2/movie/top250";
        break;
    }
    util.http(dataUrl, this.processDoubanData);
    this.setData({
      requestUrl: dataUrl
    });
  },
  processDoubanData: function (moviesDouban){
    console.log(moviesDouban);
    //处理获取到的数据
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //console.log(subject.rating.average);
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var totalMovies ={};
    var total = this.data.totalCount + 20;
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.setData({
        isEmpty : false
      });
    }
    this.setData({
      movies: totalMovies,
      totalCount: total
    });
    var totalCount = this.data.totalCount + 20;
  },
  onReady:function(){
    var that = this;
    //设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.category,
      success: function () {

      }
    })
  },
  onScrollLower:function(event){
    console.log("加载更多");
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
  }
})