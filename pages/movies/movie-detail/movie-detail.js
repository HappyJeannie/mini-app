var util = require("../../../utils/util.js");
// pages/movies/movie-detail/movie-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("获取到id:" + options.id);
    console.log(options);
    var movieId = options.id;
    var url = util.api +"/v2/movie/subject/"+movieId;
    util.http(url, this.processDoubanData);
  },
  processDoubanData:function(data){
    console.log("=============输出单条详情信息==========");
    console.log(data);
    if(!data){
      return;
    }
    var director = {
      avatar:"",
      name:"",
      id:""
    }
    if (data.directors[0] != null){
      if (data.directors[0].avatars != null){
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }

    var movie = {
      movieImg:data.images?data.images.large:"",
      country:data.countries[0],
      title:data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year:data.year,
      generes: data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score:data.rating.average,
      director: director,
      casts: util.converToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }
    console.log(movie);
    this.setData({
      movie: movie
    });
  },
  viewMoviePostImg:function(event){
    var src= event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
      current:src
    })
  }
})