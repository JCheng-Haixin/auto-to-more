<script setup lang="ts">
// import { AutoOverflow, AutoOverflowChild } from '../../packages'
import AutoOverflow from '../../packages/lib/auto-overflow/AutoOverflow.vue'
import AutoOverflowChild from '../../packages/lib/auto-overflow-child/AutoOverflowChild.vue'
import { ref } from 'vue';

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <AutoOverflow :maxCount="3">
      <AutoOverflowChild><span>123</span></AutoOverflowChild>
      <AutoOverflowChild><span>456</span></AutoOverflowChild>
      <AutoOverflowChild><span>456</span></AutoOverflowChild>
      <AutoOverflowChild><span>789</span></AutoOverflowChild>

      <template #overflow-content="{ OverflowContent }">
        <component :is="OverflowContent" />
      </template>
    </AutoOverflow>
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
