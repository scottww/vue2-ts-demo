import request from '@/utils/request'

// 获取用户列表
export function getUsers(params) {
  // GET 请求统一传 params
  return request.get('/api/users', params)
}

export function addUser(data) {
  return request.post('/api/users', data)
}

export function deleteUser(id) {
  return request.delete('/api/users', { id })
}

