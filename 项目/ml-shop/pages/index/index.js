// 首页
const util = require('../../utils/utils');
const api = require('../../config/api');

Page({
  data:{
    newGoods : [],// 新品首发
    hotGoods : [],// 人气推荐
    topics : [],// 专题精选
    brands : [],// 品牌制造商
    groupons : [],// 团购专区
    floorGoods : [],// 从居家开始的层级数据（二维数组）
    banner : [],// 轮播图数据
    channel : [],// 九宫格数据
    coupon : [],// 优惠券
    goodsCount : 0,// 商品搜索，共 XX 款好物（搜索框）
  },
  getIndexData(){
    // 调用接口，更新数据
    util.request(api.IndexUrl).then(res => {
      if(res.errno === 0){
        this.setData({
          newGoods : res.data.newGoodsList,
          hotGoods : res.data.hotGoodsList,
          topics : res.data.topicList,
          brands : res.data.brandList,
          groupons : res.data.grouponList,
          floorGoods : res.data.floorGoodsList,
          banner : res.data.banner,
          coupon : res.data.couponList,
          channel : res.data.channel,
        });
      }
    });
    util.request(api.GoodsCount).then(res=>{
      this.setData({
        goodsCount : res.data.goodsCount
      })
    });

  },

  onLoad(){
    this.getIndexData()
  }
})
