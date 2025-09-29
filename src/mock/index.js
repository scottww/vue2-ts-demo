import Mock from 'mockjs'

// 引入模块
import './user'
import './upload'

Mock.setup({
  timeout: '500-1000ms', // 模拟网络延迟
})
