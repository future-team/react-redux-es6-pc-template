var package = require('../../package.json');
var ci = require('../../f2eci.json');

var devPort = '3005';

module.exports = {
  //静态页存储目录
  html:"./src/resources",
  //本地调试端口
  devPort:devPort,
  //调试默认打开的页面
  defaultStartPage:'/src/resources/dev.html',
  //是否自动生成manifest
  manifest:false,
  //web or app
  projectType:'web',
  //生成目录
  "output": "./dist",
  env:ci.env || 'beta',
  //资源对应的不同环境域名
  cdn:{
    dev:'//127.0.0.1:'+devPort+'/dist/',
    beta:'//s1.51ping.com/app/'+package.name+'/',
    pro:'//www.dpfile.com/app/'+package.name+'/'
  }
};