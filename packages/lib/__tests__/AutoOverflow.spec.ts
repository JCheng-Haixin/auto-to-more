import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { mount } from '@vue/test-utils'
import AutoOverflow from '../auto-overflow'
import AutoOverflowChild from '../auto-overflow-child'
import { h } from 'vue'

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

describe('AutoOverflow', () => {
  it('renders properly', async () => {
    const wrapper = mount(AutoOverflow, { 
      props: { maxCount: 3 },
      slots: {
        default: [
          h(AutoOverflowChild, {}, () => h('span', {}, '123')),
          h(AutoOverflowChild, {}, () => h('span', {}, '456')),
          h(AutoOverflowChild, {}, () => h('span', {}, '789')),
          h(AutoOverflowChild, {}, () => h('span', {}, '098'))
        ],
        'overflow-content': `
          <template #overflow-content="{ OverflowContent }">
            <component :is="OverflowContent" />
          </template>
        `
      }
    })
    console.log('wrapper1: ', wrapper.html());
    await wait(1000)
    console.log('wrapper2: ', wrapper.html());
  })
})
