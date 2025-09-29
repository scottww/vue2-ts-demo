// 将各模块接口统一导出
import * as userApi from './user'
import * as uploadApi from './upload'

export default {
  ...userApi,
  ...uploadApi,
}

// 或者单独导出每个模块
export {
  userApi,
  uploadApi
}
