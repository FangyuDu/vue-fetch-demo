import Router from 'koa-router'
import resPack from '../utils/resPack.js'
import { koaBody } from 'koa-body'
import path from 'path'
import { fileURLToPath } from 'url'
import fse from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const xhrRouter = new Router()

// 普通接口
xhrRouter.get('/fetchJSON', (ctx, next) => {
  ctx.body = resPack.success({ message: `Hello World!` })
})

// 带参数的普通接口
xhrRouter.get('/fetchJSON2', (ctx, next) => {
  // 获取请求参数
  const { query } = ctx.request
  const { username = '默认用户名' } = query
  ctx.body = resPack.success({ message: `Hello ${username}!` })
})

// 表单形式的接口
xhrRouter.post('/fetchForm', (ctx, next) => {
  // 获取表单中的参数
  const { body } = ctx.request
  const { username = '默认用户名' } = body
  ctx.body = resPack.success({ message: `Hello ${username}!` })
})

// 文件上传接口
xhrRouter.post(
  '/fetchUpload',
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '../uploads'),
      keepExtensions: true,
      onFileBegin: (name, file) => {
        // 确保上传目录存在
        fse.ensureDirSync(path.join(__dirname, '../uploads'))
      }
    }
  }),
  (ctx, next) => {
    // 获取上传的文件
    const { files } = ctx.request
    const { file } = files
    // 返回文件信息
    ctx.body = resPack.success({ message: `文件上传成功!` })
  }
)

// Axios Cancel
xhrRouter.get('/axiosCancel', async (ctx, next) => {
  // 模拟请求耗时
  ctx.body = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(resPack.success({ message: `Hello World!` }))
    }, 30 * 1e3)
  })
})

// 模拟 401 接口
xhrRouter.get('/fetch401', (ctx, next) => {
  ctx.status = 401
  ctx.body = resPack.error({ message: `未授权!` })
})

export default xhrRouter
