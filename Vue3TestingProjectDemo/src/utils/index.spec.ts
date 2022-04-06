/*
 * @Author: zxb
 * @Date: 2022-03-28 14:25:46
 * @LastEditTime: 2022-03-28 14:30:52
 * @LastEditors: zxb
 * @Description:
 * @FilePath: /Vue3TestingProjectDemo/src/utils/index.spec.ts
 */

import { describe, expect, test } from 'vitest'
import { increment } from '.'

describe('increment', () => {
  test('increments the current number by 1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('does not increment the current number over the max', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('has a default max of 10', () => {
    expect(increment(-1)).toBe(10)
  })
})
