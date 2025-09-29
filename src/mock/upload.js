import Mock from 'mockjs'

Mock.mock('/api/upload', 'post', (options) => {
  return {
    code: 200,
    msg: '上传成功',
    url: 'https://example.com/file.png'
  }
})
