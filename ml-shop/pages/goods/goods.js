// 商品详情页面
const util = require('../../utils/utils');
const api = require('../../config/api')

Page({
  data : {
    id : 0, //请求商品id
    goods : {},// 商品数据
    atttribute : [],// 商品的参数
    issueList : [], // 常见问题数据
    comment : [],// 评论
    brand : {},// 制造商信息
    specificationList : [],// 规格信息
    productList : [],// 一个商品对应的不同产品
    checkedSpecPrice : 0,// 商品价格
  },
  // 获取商品信息
  getGoodsInfo(){
    util.request( api.GoodsDetail , {id : this.data.id }).then(res => {
      if(res.errno === 0){
        // console.log(res);
        this.setData({
          goods: res.data.info,
          atttribute: res.data.atttribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          checkedSpecPrice: res.data.info.retailPrice,
        });
      }
    })
  },
  // 生命周期
  onLoad(options){
    if(options.id){
      this.setData({
        id: parseInt(options.id),
      });
      this.getGoodsInfo();
    }
  }
})