<template lang="pug">
button(@click="fetchData", :disabled="lock") 尝试轮询消息
//- 时间
.timestamp {{ time }}
//- 历史
.log
  .msg(v-for="(item, index) in fetchHis")
    time.timestamp {{ item }}
//- .log {{ data }}
</template>
<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const data = ref<any>({})
const fetchHis = ref<any>([])

const time = ref<number>(0)

const lock = ref<boolean>(false)

const controller = new AbortController()

// 长轮询
const fetchData = async () => {
  lock.value = true
  time.value = 0
  let t = setInterval(() => {
    time.value++
  }, 1e3)
  await fetch('http://localhost:3001/api/fetchLongPolling', {
    signal: controller.signal
  })
  fetchHis.value.push(time.value)
  clearInterval(t)
  fetchData()
}

onUnmounted(() => {
  // 终止轮询
  console.log('终止轮询')
  controller.abort()
})
</script>
