import Router from 'koa-router'
import resPack from '../utils/resPack.js'
import { koaBody } from 'koa-body';
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

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
xhrRouter.post('/fetchUpload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../public/uploads'),
    keepExtensions: true,
    onFileBegin: (name, file) => {
      // 文件上传前的设置
      console.log(`name: ${name}`)
      console.log(file)
    }
  }
}), (ctx, next) => {
  // 获取上传的文件
  const { files } = ctx.request
  const { file } = files
  // 打印文件信息
  console.log(file)
  // 读取文件内容
  // const fileContent = fs.readFileSync(file.path, { encoding: 'utf-8' })

  // 返回文件信息
  ctx.body = resPack.success({ message: `文件上传成功!` })
})

export default xhrRouter
