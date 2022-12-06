import chalk from 'chalk'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { PassThrough } from 'stream'
import { koaBody } from 'koa-body'
import xhrRouter from './xhr/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// websocket
import websockify from 'koa-websocket'

const app = new Koa()

const router_1 = new Router()

// 长轮询接口
router_1.get('/fetchLongPolling', async (ctx, next) => {
  // 随机延迟 5 - 60 秒
  const delay = Math.floor(Math.random() * 60 + 5) * 1e3
  console.log(chalk.green(`delay: ${delay}`))
  ctx.body = await new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟2分分钟后返回数据
      resolve({ message: 'Hello World!', progress: 100 })
    }, delay)
  })
})

// EventSource 接口
router_1.get('/fetchEventSource', async (ctx, next) => {
  const ss = new PassThrough()
  ctx.set('Content-Type', 'text/event-stream')
  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Connection', 'keep-alive')
  ctx.body = ss
  let progress = 0
  // 持续发送数据
  const timer = setInterval(() => {
    if (progress < 100) {
      const msg = `event:message\ndata: ${JSON.stringify({
        message: '请求处理中...',
        progress
      })}\n\n`
      ss.push(msg)
      progress += 20
    } else {
      const endMsg = `event:end\ndata: ${JSON.stringify({
        message: '消息发送完毕',
        progress: 100
      })}\n\n`
      ss.push(endMsg)
      ss.end()
      clearInterval(timer)
    }
  }, 1e3)
})

const rootRouter = new Router()

rootRouter.use('/api', xhrRouter.routes(), xhrRouter.allowedMethods())
rootRouter.use('/api', router_1.routes(), router_1.allowedMethods())

app.use(cors())
app.use(bodyParser())
app.use(rootRouter.routes()).use(rootRouter.allowedMethods())

// ws
const wss = websockify(app)
wss.ws.use((ctx, next) => {
  // websocket
  ctx.websocket.on('message', message => {
    // buffer to string
    // 回文： 时间戳 + message
    ctx.websocket.send(
      JSON.stringify({ time: Date.now(), msg: message.toString() })
    )
  })
})

app.listen(3001, () => {
  console.log(chalk.green('Server is running on port 3001'))
})
