<template lang="pug">
section.list__item
  h2.list__title Axios Cancel
  .mb-4
    button(@click="fetchAxiosCancel", :disabled="loading")  请求{{ loading ? '中。' : '' }}
    button.ml-5(@click="abortFetch")  中断请求
  pre.log.mb-5 {{ data }}
</template>
<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue'

const loading = ref(false)

const data = ref<any>({})

const source = axios.CancelToken.source()

const fetchAxiosCancel = async () => {
  loading.value = true
  // 期望 30s 后返回数据
  try {
    const res = await axios('http://localhost:3001/api/axiosCancel', {
      cancelToken: source.token
    })
    data.value = res.data
  } catch (error) {
    console.log(error)
    data.value = error
  } finally {
    loading.value = false
  }
}

const abortFetch = async () => {
  source.cancel('Operation canceled by the user.')
}
</script>
