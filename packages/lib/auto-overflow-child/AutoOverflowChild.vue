<script setup lang="ts">
  import { getCurrentInstance, inject, onMounted, onUnmounted, reactive, ref } from 'vue';


  defineOptions({
    name:'Child'
  })

  const instance = getCurrentInstance()!

  const { add, remove } = inject('mountAction') as any

  const childShow = ref(false)

  const child = reactive({
    uid: instance.uid,
    to: '',
    hidden: true
  })

  onMounted(() => {
    add(child) 
    childShow.value = true
  })

  onUnmounted(() => { remove(instance.uid) })
</script>

<template>
  <template v-if="!child.hidden && childShow">
    <slot v-if="!child.to" />
    <Teleport v-else :to="child.to">
      <slot />
    </Teleport>
  </template>
</template>