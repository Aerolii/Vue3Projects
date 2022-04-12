/*
 * @Author: zxb
 * @Date: 2022-04-12 16:58:46
 * @LastEditTime: 2022-04-12 17:11:37
 * @LastEditors: zxb
 * @Description:
 * @FilePath: /CypressTesting/src/composables/login/login.ts
 */

import { computed, ref } from 'vue'
import UserLogin from './UserLogin'

export default function () {
  const username = ref('')
  const password = ref('')

  const user = new UserLogin()

  const nameReg = /\d/
  const pwdReg = /[a-zA-Z0-9]{3}/

  const loginStatus = ref(-1)

  const loginMessage = computed(() =>
    loginStatus.value > -1 ? (loginStatus.value === 1 ? '登录成功' : '登录失败') : ''
  )

  const submitHandle = () => {
    loginStatus.value = Number(user.login(username.value, password.value, nameReg, pwdReg))
  }

  return {
    username,
    password,
    loginMessage,
    submitHandle
  }
}
