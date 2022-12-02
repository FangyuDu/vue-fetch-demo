<template lang="pug">
button(@click="fetchData") 获取数据
.log {{ data }}
</template>
<script setup lang="ts">
import { ref } from 'vue'

const data = ref<any>({})
const fetchData = async () => {
  const res = await fetch('http://localhost:3001/api/fetchJSON')
  // const data = await res.json()
  console.log(data)
  data.value = await res.json()
}
</script>
