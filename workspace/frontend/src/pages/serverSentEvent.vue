<template lang="pug">
button(@click="fetchData", :disabled="lock") 开始接收消息
progress(max='100' :value='progress') {{progress}}%

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

const progress = ref<number>(0)

const lock = ref<boolean>(false)

class SSE extends EventSource {
  constructor(url: string) {
    super(url)
    this.addEventListener('end', e => {
      console.log('EventSource end', e)
      const res = JSON.parse(e.data)
      data.value = res
      progress.value = res.progress
      fetchHis.value.push(res)
      this.stop()
    })

    this.onopen = () => {
      console.log('open')
    }

    this.onmessage = e => {
      console.log('message', e)
      try {
        const res = JSON.parse(e.data)
        data.value = res
        progress.value = res.progress
        fetchHis.value.push(res)
      } catch (error) {
        data.value = e.data
      }
    }

    this.onerror = (e: Event) => {
      console.log('error', e)
    }
  }

  stop() {
    console.log('停止本次请求！')
    this.close()
  }
}

const sse = ref<SSE>()

const fetchData = () => {
  sse.value?.stop()
  sse.value = new SSE('http://localhost:3001/api/fetchEventSource')
}

onUnmounted(() => {
  // 终止轮询
  sse.value?.stop()
})
</script>
