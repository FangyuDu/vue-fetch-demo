<template lang="pug">
textarea(style="display:block; min-height: 100px; width: 100%;", v-model="message")
button(@click="sendData") 发送数据
hr.
.log
  .msg(v-for="(item, index) in msgList")
    time.timestamp {{ item.time }}
    span {{ item.msg }}
hr.
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import dayjs from 'dayjs'

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
      msg: data.msg
    })
  } catch (error) {
    console.log('WebSocket onmessage error', error)
  }
}

ws.onclose = () => {
  console.log('WebSocket onclose')
}

const message = ref<string>('')

const msgList = ref<{ time: string; msg: string }[]>([])

const sendData = async () => {
  const data = {
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    msg: message.value
  }
  msgList.value.push(data)
  message.value = ''
  ws.send(data.msg)
}

onBeforeUnmount(() => {
  ws.close()
})

let times = 0
onMounted(() => {
  setInterval(() => {
    ws.send(`新的待办消息- ${times++}`)
  }, 10 * 1e3)
})
</script>
<style lang="less" scoped>
.log {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 500px;
  overflow: auto;
  .msg {
    display: flex;
    align-items: flex-start;
    .timestamp {
      color: #999;
      margin-right: 10px;
    }
  }
}
</style>
