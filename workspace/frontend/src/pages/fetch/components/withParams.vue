<template lang="pug">
section.list__item
  h2.list__title 传参请求
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

const fetchDataWithParams = async () => {
  const res = await fetch('http://localhost:3001/api/fetchJSON3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  })
  data.value = await res.json()
}
</script>
