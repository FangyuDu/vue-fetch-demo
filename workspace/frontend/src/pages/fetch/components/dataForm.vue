<template lang="pug">
section.list__item
  h2.list__title 表单传参
  .mb-4
    input.p-2.border(
      v-model="query.username",
      placeholder="请输入用户名",
      name='first-name',
      autocomplete='given-name',
      @keydown.enter="fetchDataWithParams"
    )
    button.ml-5(@click="fetchDataWithParams")  传参请求
  pre.log.mb-5 {{ data }}
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

// params
const query = reactive({
  username: 'admin'
})

const data = ref<any>({})

// TODO 待优化
const fetchDataWithParams = async () => {
  const api = 'http://localhost:3001/api/fetchForm'
  // form
  const reqParams = new FormData()
  reqParams.append('username', query.username)

  // form 格式化
  const params = new URLSearchParams()
  for (const [key, value] of reqParams as any) {
    params.append(key, value)
  }
  // 表单接口
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
  data.value = await res.json()
}
</script>
