<script setup lang="ts">
  import { getCurrentInstance, inject, onMounted, onUnmounted, reactive, ref } from 'vue';


  defineOptions({
    name:'Child'
  })

  const instance = getCurrentInstance()!

  const { add, remove } = inject('mountAction', {
    add(child) { 
      child.hidden = false
      console.warn('AutoOverflowChild: need use AutoOverflow as parent') 
    }, 
    remove() {}
  }) as any

  const child = reactive({
    uid: instance.uid,
    to: '',
    hidden: true
  })

  onMounted(() => { add(child) })
  onUnmounted(() => { remove(instance.uid) })
</script>

<template>
  <template v-if="!child.hidden">
    <slot v-if="!child.to" />
    <Teleport v-else :to="child.to">
      <slot />
    </Teleport>
  </template>
</template>