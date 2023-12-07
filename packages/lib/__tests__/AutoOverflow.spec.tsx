import { describe, expect, test } from 'vitest'

import { mount } from '@vue/test-utils'
import AutoOverflow from '../auto-overflow'
import AutoOverflowChild from '../auto-overflow-child'
import { nextTick } from 'vue'

declare module 'vitest' {
  export interface ProvidedContext {
    mountAction: string
  }
}

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  })
}

describe('AutoOverflowChild', () => {
  test('渲染内容', async () => {
    const wrapper = mount({
      render() {
        return (
          <AutoOverflowChild>1</AutoOverflowChild>
        )
      }
    })
    // 默认不展示，需要 nextTick
    await nextTick()
    expect(wrapper.html()).toContain('1')
  })
})

describe('AutoOverflow', () => {
  test('渲染普通内容', () => {
    const wrapper = mount({
      render() {
        return (
          <AutoOverflow>1</AutoOverflow>
        )
      }
    })
    expect(wrapper.html()).toContain('1')
  })

  test('默认3个子组件时渲染3个', async () => {
    const wrapper = mount({
      render() {
        return (
          <AutoOverflow v-slots={{ ['overflow-content']: () => (<>abc</>) }}>
            <AutoOverflowChild>1</AutoOverflowChild>
            <AutoOverflowChild>2</AutoOverflowChild>
            <AutoOverflowChild>3</AutoOverflowChild>
          </AutoOverflow>
        )
      }
    })
    await nextTick()
    expect(wrapper.html()).toContain('1\n2\n3')
  })

  // TODO: 允许配置？
  test('默认4个子组件时渲染2个', async () => {
    const wrapper = mount({
      render() {
        return (
          <AutoOverflow v-slots={{ ['overflow-content']: () => (<>abc</>) }}>
            <AutoOverflowChild>1</AutoOverflowChild>
            <AutoOverflowChild>2</AutoOverflowChild>
            <AutoOverflowChild>3</AutoOverflowChild>
            <AutoOverflowChild>4</AutoOverflowChild>
          </AutoOverflow>
        )
      }
    })
    await nextTick()
    expect(wrapper.html()).toContain('1\n2')
    expect(wrapper.html()).not.toContain('1\n2\n3')
  })

  // test('渲染同步内容', async () => {
  //   let OutsideOverflowContent = null  
  //   const wrapper = mount({
  //     render() {
  //       return (
  //         <AutoOverflow v-slots={{
  //           default: () => (<>
  //             <AutoOverflowChild>1</AutoOverflowChild>
  //             <AutoOverflowChild>2</AutoOverflowChild>
  //             <AutoOverflowChild>3</AutoOverflowChild>
  //             <AutoOverflowChild>4</AutoOverflowChild>
  //             <AutoOverflowChild>5</AutoOverflowChild>
  //           </>),
  //           ['overflow-content']: ({ OverflowContent }) => {
  //             OutsideOverflowContent = OverflowContent
  //             return <div>
  //               <OverflowContent />
  //             </div>
  //           }
  //         }}></AutoOverflow>
  //       )
  //     }
  //   })
  //   await wait(1000)
  //   const d = wrapper.getComponent(c)
  //   console.log('同步', d)
  // })

  // it('renders properly', async () => {
  //   const wrapper = mount(AutoOverflow, { 
  //     props: { maxCount: 3 },
  //     slots: {
  //       default: [
  //         h(AutoOverflowChild, {}, () => h('span', {}, '123')),
  //         h(AutoOverflowChild, {}, () => h('span', {}, '456')),
  //         h(AutoOverflowChild, {}, () => h('span', {}, '789')),
  //         h(AutoOverflowChild, {}, () => h('span', {}, '098'))
  //       ],
  //       'overflow-content': `
  //         <template #overflow-content="{ OverflowContent }">
  //           <component :is="OverflowContent" />
  //         </template>
  //       `
  //     }
  //   })
  //   console.log('wrapper1: ', wrapper.html());
  //   await wait(1000)
  //   console.log('wrapper2: ', wrapper.html());
  // })
})
