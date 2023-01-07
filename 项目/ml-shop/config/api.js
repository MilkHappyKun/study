let WxApiRoot = 'http://127.0.0.1:8082/wx/';
module.exports = {
  // ----------------------------------首页接口
  IndexUrl : WxApiRoot + 'home/index', //首页数据接口
  GoodsCount : WxApiRoot + 'goods/count', //统计商品总数
  // ------------------------------------分类页面接口
  CatalogList : WxApiRoot + 'catalog/index',// 分类目录全部数据接口
  CatalogCurrent : WxApiRoot + 'catalog/current',// 分类目录当前分类数据接口
  // --------------------------- 注册，登录，退出登录
  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
  AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
  AuthLogout: WxApiRoot + 'auth/logout', //账号退出
  AuthRegister: WxApiRoot + 'auth/register', //账号注册
  AuthReset: WxApiRoot + 'auth/reset', //账号密码重置
  // -------------------------------商品详情页面相关
  GoodsDetail : WxApiRoot + 'goods/detail', //获得商品的详情
  GoodsRelated: WxApiRoot + 'goods/related',// 商品详情页的关联商品（大家都在看）
};