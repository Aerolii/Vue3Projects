<script setup lang="ts">
import useUserLogin from '@/composables/login/login'
defineProps<{ title: string }>()
const { username, password, submitHandle, loginMessage } = useUserLogin()
</script>

<template>
  <div id="userLogin">
    <h1>{{ title }}</h1>

    <section class="login-wrapper">
      <div class="custom_field_input">
        <label class="field_input_item field_title" for="username">用户名</label>
        <input
          autocomplete="false"
          class="field_input_item field_input"
          type="text"
          name="username"
          id="userName"
          v-model="username" />
      </div>
      <div class="custom_field_input">
        <label class="field_input_item field_title" for="password">密码</label>
        <input
          autocomplete="false"
          class="field_input_item field_input"
          type="password"
          name="password"
          id="password"
          v-model="password" />
      </div>
      <div class="submit-btn-wrapper">
        <button class="submit-btn" @click="submitHandle">登录</button>
      </div>

      <article class="login-result">
        <p>{{ loginMessage }}</p>
      </article>
    </section>
  </div>
</template>

<style scoped lang="less">
#userLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-wrapper {
    .custom_field_input {
      display: flex;
      align-items: center;
      margin: 1em 1em;
      .field_input_item {
        display: inline-block;
        min-width: 4em;
      }

      .field_title {
        font-weight: bold;
      }

      .field_input {
        width: 18em;
        font-size: 16px;
        box-sizing: border-box;
        padding: 0.2em 0.4em;
        border: none;
        line-height: 32px;
        margin: 0;
        background-color: #efefef;
        border-radius: 0.5em;
        outline: none;
        &:focus {
          background-color: rgba(240, 240, 240, 0.8);
          transition: background-color 200ms ease-out;
        }
      }
    }

    .submit-btn-wrapper {
      margin: 2em 1em;
      display: flex;
      align-items: center;
      justify-content: center;

      .submit-btn {
        width: 100%;
        padding: 0.6em 0.8em;
        border-radius: 0.5em;
        font-size: 20px;
        border: none;
        outline: none;
        color: #ffffff;
        background-color: hsla(160, 100%, 37%, 1);
        cursor: pointer;
        // opacity: 1;
        letter-spacing: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          // opacity: 0.8;
          background-color: hsla(160, 100%, 37%, 0.8);
        }
      }
    }

    .login-result {
      line-height: 30px;
      height: 30px;
      text-align: center;
    }
  }
}
</style>
