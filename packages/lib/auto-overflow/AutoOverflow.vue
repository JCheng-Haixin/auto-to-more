<script setup lang="tsx">
  import { computed, getCurrentInstance, provide, ref, watch, h, nextTick } from 'vue';
  import { useOrderedChildren } from '../composables/getOrderedChildren'
  import { uniqueId } from 'lodash-es';

  const parent = getCurrentInstance()!

  const { addChild, removeChild, children } = useOrderedChildren(parent as any, 'Child')

  const props = defineProps({
    maxCount: { type: Number, default: 3 }
  })

  const id = uniqueId('more-')

  provide('mountAction', {
    add: addChild,
    remove: removeChild
  })

  const useMore = computed(() => children.value.length > props.maxCount)  
  
  let firstAfferentProps: any
  const overflowTargetMounted = ref(false)
  function OverflowContent(targetProps: any, { slots }: any) {
    // 记录首次挂载时传入的 props
    if (!firstAfferentProps) firstAfferentProps = targetProps
    const defaultContent = slots.default && slots.default()
    const tag  = targetProps?.tag || 'div'
    if (targetProps !== firstAfferentProps) return
    return h(
      tag, 
      { 
        id, 
        class: 'overflow-box', 
        onVnodeMounted: () => overflowTargetMounted.value = true, 
        onVnodeUnmounted: () => overflowTargetMounted.value = false 
      }, 
      defaultContent)
  }
  
  watch(() => [...children.value, overflowTargetMounted.value], () => {
    children.value.forEach((item, index) => {
      const needTeleport = useMore.value && index >= props.maxCount - 1
      needTeleport && !overflowTargetMounted.value ? item.hidden = true : item.hidden = false
      if (!useMore.value || !overflowTargetMounted.value) return item.to = ''
      item.to = needTeleport ? `#${id}` : ''
    })
  }, { immediate: true })
</script>

<template>
  <slot />
  <slot v-if="useMore" name="overflow-content" :OverflowContent="OverflowContent" />
</template>

<style lang="scss">
  .overflow-box {
    white-space: nowrap;
  }
</style>