import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', async () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    // expect(wrapper.text()).toContain('Hello Vitest')

    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).toContain('1')
    console.log(wrapper.text())
  })
})
