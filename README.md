# vue2-ts-demo

- Node.js 版本：16.11.0
- 使用 npm 作为包管理工具

## 项目设置
### 1. 安装依赖
使用 npm 安装项目依赖：
```bash
npm install
```

### 2. 启动开发服务器
启动开发模式，支持热重载：
```bash
npm run dev
```
开发服务器将会启动，默认地址为 http://localhost:8080
，可以通过浏览器访问。

### 3. 生产构建
使用下面的命令进行构建，并将代码压缩、优化用于生产环境：
```bash
npm run build
```
构建后的文件将在 dist/ 目录下生成。

### 4. 代码检查与修复
使用 ESLint 对项目中的代码进行检查和修复：
```bash
npm run lint
```

## 常见问题
### 1. ssh 克隆报 22 端口超时
如果通过 ssh 克隆项目时报错：ssh: connect to host github.com port 22: Connection timed out，可以尝试使用 HTTPS 协议进行克隆，或者修改为以下 ssh 协议格式，指定 443 端口，避免 22 端口被阻塞：
```bash
git clone ssh://git@ssh.github.com:443/scottww/vue2-ts-demo.git
```
### 2. 依赖安装失败
如果在执行 npm install 时遇到问题，可以尝试以下步骤：
- 清除缓存并重新安装：
```bash
npm cache clean --force
npm install
```

### 3. 环境配置
项目中使用了 .env 文件来配置环境变量，确保在不同环境下的 API 地址等参数正确配置。

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).