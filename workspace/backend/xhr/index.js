import Router from 'koa-router'
import resPack from '../utils/resPack.js'

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

export default xhrRouter
