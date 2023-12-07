import { describe, it, expect, beforeEach, afterEach, test } from 'vitest'

import { mount } from '@vue/test-utils'
import AutoOverflow from '../auto-overflow'
import AutoOverflowChild from '../auto-overflow-child'

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

// describe('AutoOverflowChild', () => {
//   test('渲染内容', () => {
//     const wrapper = mount({
//       render() {
//         return (
//           <AutoOverflowChild>1</AutoOverflowChild>
//         )
//       }
//     })
//     expect(wrapper.html()).toContain('1')
//   })
// })

describe('AutoOverflow', () => {
  test('should render content', () => {
    const wrapper = mount({
      render() {
        return (
          <AutoOverflow>1</AutoOverflow>
        )
      }
    })
    expect(wrapper.html()).toContain('1')
  })

  test('default child is 3', () => {
    const wrapper = mount({
      render() {
        return (
          <AutoOverflow v-slots={{ ['overflow-content']: () => (<>abc</>) }}>
            <AutoOverflowChild>1</AutoOverflowChild>
            <AutoOverflowChild>1</AutoOverflowChild>
            <AutoOverflowChild>1</AutoOverflowChild>
            <AutoOverflowChild>1</AutoOverflowChild>
          </AutoOverflow>
        )
      }
    })
    console.log('abc', wrapper.html())
    expect(wrapper.html()).toContain('111')
  })



  test('渲染同步内容', async () => {
    let c = null  
    const wrapper = mount({
      render() {
        return (
          <AutoOverflow v-slots={{
            default: () => (<>
              <AutoOverflowChild>1</AutoOverflowChild>
              <AutoOverflowChild>2</AutoOverflowChild>
              <AutoOverflowChild>3</AutoOverflowChild>
              <AutoOverflowChild>4</AutoOverflowChild>
              <AutoOverflowChild>5</AutoOverflowChild>
            </>),
            ['overflow-content']: ({ OverflowContent }) => {
              c = OverflowContent
              return <div>abc<OverflowContent /></div>
            }
          }}></AutoOverflow>
        )
      }
    })
    await wait(1000)
    const d = wrapper.getComponent(c)
    console.log('同步', d)
  })

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
