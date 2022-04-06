/*
 * @Author: zxb
 * @Date: 2022-03-28 14:25:02
 * @LastEditTime: 2022-03-28 14:25:03
 * @LastEditors: zxb
 * @Description: 单元测试示例
 * @FilePath: /Vue3TestingProjectDemo/src/utils/index.ts
 */

export function increment(current: number, max = 10): number {
  if (current < max) {
    return current + 1
  }
  return current
}
