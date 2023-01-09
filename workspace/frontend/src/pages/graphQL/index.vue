<template lang="pug">
div {{User?.hello}}
</template>
<script setup lang="ts">
import gql from 'graphql-tag'
import { DefaultApolloClient, provideApolloClient, useQuery } from '@vue/apollo-composable'
import { apolloClient } from '../../apollo/index'
import { ref } from 'vue';


provideApolloClient(apolloClient)

const query = gql`
  query {
    hello(message: "世界")
  }
`
console.log(query)
const { result: User, loading } = useQuery(query)
// const User = ref(result)

console.log(User)
</script>