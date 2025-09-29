// src/mock.js
import Mock from 'mockjs'

// 存储模拟的用户数据
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]

// 工具函数：去掉 URL 中的查询参数
function normalizeUrl(url) {
  return url.split('?')[0]
}

// 统一拦截 /api/users
Mock.mock(/\/api\/users(\?.*)?/, (options) => {
  const url = normalizeUrl(options.url)
  const method = options.type.toLowerCase() // get/post/delete

  if (url !== '/api/users') return {}

  if (method === 'get') {
    return {
      code: 200,
      users
    }
  }

  if (method === 'post') {
    const body = JSON.parse(options.body)
    const newUser = {
      id: Date.now(),
      name: body.name
    }
    users.push(newUser)
    return {
      code: 200,
      msg: `添加成功: ${body.name}`,
      data: newUser
    }
  }

  if (method === 'delete') {
    const body = JSON.parse(options.body)
    users = users.filter(u => u.id !== body.id)
    return {
      code: 200,
      msg: `删除成功: ${body.id}`
    }
  }

  return {}
})
