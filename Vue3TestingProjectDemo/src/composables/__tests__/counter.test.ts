/*
 * @Author: zxb
 * @Date: 2022-03-28 14:43:36
 * @LastEditTime: 2022-03-28 14:45:47
 * @LastEditors: zxb
 * @Description:
 * @FilePath: /Vue3TestingProjectDemo/src/composables/__tests__/counter.test.ts
 */
import { test, expect } from 'vitest'
import { useCounter } from '../counter'

test('useCounter', () => {
  const { count, increment } = useCounter()

  expect(count.value).toBe(0)
  increment()
  expect(count.value).toBe(12)
})
