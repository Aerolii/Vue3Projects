# [Vitest 官方指引](https://cn.vitest.dev/guide/)

## 添加 Vitest 到项目中

```shell
# 使用 npm
npm install -D vitest
```

> **Vitest 需要 Vite >= v2.7.10 和 Node >= v14**

## 命令行

Vitest 脚手架项目中的默认的 npm 脚本：

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

要在不监听文件更改的情况下只运行一次测试，请使用 vitest run。 你可以指定其他 CLI 选项，例如 --port 或 --https。

### 命令

- vitest watch
  运行所有的测试套件，但要注意文件更改时会重新运行相关测试，直接调用 vitest 同样如此。

- vitest run
  非监听模式下运行单次测试。

- vitest dev
  在开发模式下运行 Vitest 。

- vitest related
  仅运行涵盖了源文件列表的测试。适用于静态惰性导入，但不适用于动态导入。所有文件都应相对于根目录文件夹。

### 启用 Vitest UI

在使用`Vite`构建项目时，如果默认勾选了`Vitest`，则项目中内置`Vitest`启动脚本命令：

```json
"test:unit": "vitest --environment jsdom"
```

该启动命令未使用`Vitest UI`，默认为`shell`输出单次所有测试脚本运行结果，并监听文件。

如下所示：

```shell
 ❯ src/utils/index.spec.ts (3)
   ❯ increment (3)
     √ increments the current number by 1
     √ does not increment the current number over the max
     × has a default max of 10
 ❯ src/composables/__tests__/counter.test.ts (1)
   × useCounter
 ❯ src/components/__tests__/HelloWorld.spec.ts (0)
```

若使用`UI`，则需要手动配置并安装依赖：

```json
"test:unit": "vitest --ui --environment jsdom"
```

命令行启动时，提示如下：

```shell
 MISSING DEP  Can not find dependency '@vitest/ui'

✔ Do you want to install @vitest/ui? … yes
```

输入`yes`并执行安装后，重新启动将自动打开`Web UI`视图。

![图片](/images/ui.png)

## 单元测试示例

### 测试可组合函数

如果一个可组合程序只使用响应性 API，那么它可以通过直接调用并断言其返回的状态或方法来进行测试。

文档结构如下：

```
├── composables
│   ├── __tests__
│   │   └── counter.test.ts
│   └── counter
│       └── index.ts
```

> 通常意义上，我们可以将可组合函数理解为对使用`setup`语法糖的**VUE单文件组件**内部`script`标签作用域内代码逻辑的抽离。

在`counter/index`中，使用响应性API抽离出`increment`组合函数:

```javascript
// 使用内置响应性API绑定数据与视图
import { ref } from 'vue'

// 通常，为了区分普通函数和可组合函数，可组合函数默认使用`use`开头
export const useCounter = () => {
  const count = ref(0)
  const increment = () => count.value++

  // 使用ref返回解耦结果时，不会丢失数据本身的响应性
  return {
    count,
    increment
  }
}
```

使用`useCounter`组合函数：

```javascript
import { useCounter } from '@/composables/counter'
const { increment, count } = useCounter()
```

```vue
<button @click="increment">{{ count }}</button>
```

创建`useCounter`组合函数单元测试用例：

```typescript
import { test, expect } from 'vitest'
import { useCounter } from '../counter'

test('useCounter', () => {
  const { count, increment } = useCounter()

  expect(count.value).toBe(0)
  increment()
  expect(count.value).toBe(12)
})
```

命令行执行`npm run test:unit`

模块间引用关系：

![图片](/images/module.png)

执行结果如下：

![图片](/images/error.png)

> 从上述结果输出可以看出，多次执行初始化值从而导致错误。

## 测试 VUE 组件

在上述测试组合函数示例中，我们默认开启了`Vitest`的`UI`视图，但是在测试组件时，如果使用UI视图，则会服务端抛出异常：

```
TypeError: __vite_ssr_import_1__.defineComponent is not a function
```

这是由于使用UI视图时，默认开启`SSR`服务端渲染，但由于我们在使用`vite`构建项目时，并未开启`SSR`模式，而是默认选用`SPA`模式。因此，在对组件进行单元测试时，我们应优先使用默认本地服务端测试，由**终端**`shell`视图输出测试结果，而不应选用`Vitest UI`。

### 组件测试示例

我们依然选择上述**组合函数**为例。

在`/components/`路径中，组件结构如下：

```
components
├── HelloWorld.vue
├── TheWelcome.vue
├── WelcomeItem.vue
├── __tests__
│   └── HelloWorld.spec.ts
└── icons
    ├── IconCommunity.vue
    ├── IconDocumentation.vue
    ├── IconEcosystem.vue
    ├── IconSupport.vue
    └── IconTooling.vue
```

组件内`DOM`结构如下：

```
Header
├── img
└── div
    ├── HelloWorld.vue
    └── other dom...
```

`HelloWorld`组件内：

```vue
<script setup lang="ts">
import { useCounter } from '@/composables/counter'
const { increment, count } = useCounter()

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a>
      +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>
      . What's next?
    </h3>
    <div>
      <button @click="increment">{{ count }}</button>
    </div>
  </div>
</template>
```

单元测试：

```typescript
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
```

在上述组件测试文件内，我们对`HelloWorld`组件使用手动虚拟挂载并触发`button`点击事件，从而更改`count`的值并作为`text node`渲染到 DOM 中，最终我们检测`Dom`内部`text node`(文本节点)是否包含预期值。从而，确认该组件是否通过测试。

输出结果如下：

```shell
Re-running tests... [ src/components/__tests__/HelloWorld.spec.ts ]

stdout | src/components/__tests__/HelloWorld.spec.ts > HelloWorld > renders properly
Hello Vitest You’ve successfully created a project with Vite + Vue 3 . What's next? 1

 √ src/components/__tests__/HelloWorld.spec.ts (1)

Test Files  2 passed (2)
     Tests  2 passed (2)
      Time  33ms
```
