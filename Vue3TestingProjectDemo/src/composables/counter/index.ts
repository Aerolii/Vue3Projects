/*
 * @Author: zxb
 * @Date: 2022-03-28 14:41:52
 * @LastEditTime: 2022-03-28 14:45:23
 * @LastEditors: zxb
 * @Description: 计数器
 * @FilePath: /Vue3TestingProjectDemo/src/composables/counter/index.ts
 */

import { ref } from 'vue'

export const useCounter = () => {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment
  }
}
