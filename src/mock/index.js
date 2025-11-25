import Mock from 'mockjs'

// 允许所有以 /geoserver/rest/ 开头的请求直接穿透，不被 Mock 拦截
Mock.mock(/\/geoserver\/rest\/.*/, 'passthrough');


// 引入模块
import './user'
import './upload'

Mock.setup({
  timeout: '500-1000ms', // 模拟网络延迟
})
