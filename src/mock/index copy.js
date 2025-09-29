// mock/index.js
import Mock from 'mockjs'

// 拦截 GET 请求，返回用户列表
Mock.mock('/api/users', 'get', () => {
  return Mock.mock({
    'users|5-10': [ // 生成 5~10 个用户
      {
        'id|+1': 1, // id 从 1 开始自增
        'name': '@name', // 随机名字
        'age|18-30': 20 // 随机年龄 18~30
      }
    ]
  })
})

// 拦截 POST 请求
Mock.mock('/api/login', 'post', (options) => {
  const body = JSON.parse(options.body)
  if (body.username === 'admin' && body.password === '123') {
    return { code: 0, message: '登录成功' }
  } else {
    return { code: 1, message: '账号或密码错误' }
  }
})
