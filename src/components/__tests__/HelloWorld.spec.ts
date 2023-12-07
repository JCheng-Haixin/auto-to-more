import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'
import { uniqueId } from 'lodash-es'

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  })
}

describe('HelloWorld', () => {
  it('renders properly', async () => {
    // const wrapper = mount(HelloWorld, { props: { msg: 'hhh' } })
    // await wait(3000)
    // console.log('wrapper.html: ', wrapper.html());
    // expect(wrapper.text()).toContain('Hello Vitest')
    // console.log('wrapper.text(): ', wrapper.text());
    // setTimeout(() => {
    //   console.log('text: ', wrapper.text());      
    // }, 0);
  })
})

// beforeEach(() => {
//   // create teleport target
//   const el = document.createElement('div')
//   el.id = 'more-1'
//   document.body.appendChild(el)
// })

// afterEach(() => {
//   // clean up
//   document.body.outerHTML = ''
// })
