<template lang="pug">
section.list__item
  h2.list__title Fetch Cancel
  .mb-4
    button(@click="fetchCancel", :disabled="loading")  请求{{ loading ? '中。' : '' }}
    button.ml-5(@click="abortFetch")  中断请求
  pre.log.mb-5 {{ data }}
</template>
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

const data = ref<any>({})

const controller = new AbortController();
const fetchCancel = async () => {
  loading.value = true
  // 期望 30s 后返回数据
  try {
    const res = await fetch('http://localhost:3001/api/turtleFetch', {
      signal: controller.signal
    })
    data.value = await res.json()
  } catch (error) {
    console.log(error)
    data.value = error
  } finally {
    loading.value = false
  }
}

const abortFetch = async () => {
  controller.abort()
}
</script>
