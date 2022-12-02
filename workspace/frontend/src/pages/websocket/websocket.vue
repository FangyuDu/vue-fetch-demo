<template lang="pug">
textarea(style="display:block; min-height: 100px; width: 100%;", v-model="message", @keypress.enter="sendData")
button(@click="sendData") 发送数据
button.ml-5(@click="() => !isActive ? resume() : pause()") 持续发送并响应消息
  span {{ !isActive ? '▶️' : '⏸️' }}
hr.
.log
  .msg(v-for="(item, index) in msgList")
    p.timestamp.text-center {{ item.time}}
    .msg__receive.text-left(v-if="item.type === 'receive'")
      span 【收到消息】{{ item.msg }}
    .msg__send.text-right(v-else)
      span {{ item.msg }}
hr.
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { useIntervalFn } from '@vueuse/core'

const ws = new WebSocket(`ws://localhost:3001`)

ws.onopen = () => {
  console.log('WebSocket onopen')
}
ws.onmessage = e => {
  try {
    const data = JSON.parse(e.data)
    console.log('WebSocket onmessage', data)
    msgList.value.push({
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      msg: data.msg,
      type: 'receive'
    })
  } catch (error) {
    console.log('WebSocket onmessage error', error)
  }
}

ws.onclose = () => {
  console.log('WebSocket onclose')
}

const message = ref<string>('试试输入内容并发送。')

const msgList = ref<{ time: string; msg: string; type?: string }[]>([])

const sendData = async () => {
  const data = {
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    msg: message.value
  }
  msgList.value.push({ ...data, type: 'send' })
  message.value = ''
  ws.send(data.msg)
}

onBeforeUnmount(() => {
  ws.close()
})

let times = 0

const { pause, resume, isActive } = useIntervalFn(
  () => {
    ws.send(`新的待办消息- ${times++}`)
  },
  2 * 1e3,
  {
    immediate: false
  }
)
</script>
<style lang="less" scoped>
.log {
  max-height: 500px;
  overflow: auto;
  .msg {
    .timestamp {
      color: #999;
      margin-right: 10px;
    }
  }
}
</style>
