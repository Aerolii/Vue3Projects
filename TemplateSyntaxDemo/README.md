
# Vue3 基础语法

## 模版语法

Vue 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。所有的 Vue 模板都是语法上合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。

在底层机制中，Vue 会将模板编译成高度优化的 JavaScript 代码。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。

### 文本插值

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)。

### 原始HTML

双大括号将会将数据插值为纯文本，而不是 HTML。若想插入 HTML，你需要使用 `v-html` 指令。

v-html attribute 被称为一个指令。指令由 v- 作为前缀，表明它们是一些由 Vue 提供的特殊 attribuite，它们将为渲染的 DOM 应用特殊的响应式行为。

### Attribute绑定

双大括号不能在 HTML attributes 中使用，应该使用 `v-bind` 指令。

#### 简写

开头为`:`的 attribute 可能和一般的 HTML attribute 看起来不太一样，但它的确是合法的 attribute 名称字符，并且所有支持 Vue 的浏览器都能正确解析它。此外，他们不会出现在最终渲染的标签中。

#### 布尔型 Attribute

布尔型 attribute 依据 true / false 值来决定 attribute 是否应该存在于该元素上。

当 attribute 为真值或一个空字符串 (即 `attribute=""`) 时，元素会包含这个 attribute。而当其为假值时 attribute 将被忽略。因此，可简短生命`attribute`。

#### 动态绑定多个值

如果你有像这样的一个包含多个 attribute 的 JavaScript 对象，通过不带参数的 v-bind，你可以将它们绑定到单个元素上。

```javascript
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

```html
<div v-bind="objectOfAttrs"></div>
```

### 使用 JavaScript 表达式

Vue 实际上在所有的数据绑定中都支持完整的 JavaScript 表达式，这些表达式都会被作为 JavaScript ，以组件为作用域解析执行。

在 Vue 模板内，JavaScript 表达式可以被使用在如下场景上：

- 在文本插值中 (双大括号)
- 在任何 Vue 指令 (以`v-`开头的特殊 attribute) attribute 的值中
  
使用 JavaScript 表达式的限制

- 每个绑定仅支持单一表达式
- 模板中的表达式将被沙盒化，仅能够访问到有限的全局对象列表，该列表中会暴露常用的内置全局对象，比如 `Math` 和 `Date`

#### 调用函数

可以在绑定的表达式中使用一个组件暴露的方法。

```vue
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

### 指令

指令是带有`v-`前缀的特殊 attribute，指令 attribute 的期望值为一个 JavaScript 表达式(`v-for`和`v-on`将会是例外)。使用指令是为了在其表达式值变化时响应式地对 DOM 应用更新。

#### 参数

某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。例如用`v-bind`指令来响应式地更新一个 HTML attribute：

```vue
<a v-bind:href="url"> ... </a>

<!-- 简写 -->
<a :href="url"> ... </a>
```

这里 `href` 就是一个参数，它告诉 `v-bind` 指令将表达式 `url` 的值绑定到元素的 `href` attribute 上。在简写中，参数前的一切 (例如 `v-bind:`) 都会被缩略为一个`:`字符。

另一个例子是 v-on 指令，它将监听 DOM 事件：

```vue
<a v-on:click="doSomething"> ... </a>

<!-- 简写 -->
<a @click="doSomething"> ... </a>
```

#### 动态参数

在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内：

```vue

<!--
注意，参数表达式有一些约束，
参见下面“动态参数表达式约束”一节的解释
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>

```

这里的 `attributeName` 会作为一个 JavaScript 表达式被动态执行，计算得到的值会被用作最终的参数。举个例子，如果你的组件实例有一个数据 property `attributeName`，其值为 `"href"`，那么这个绑定就等价于 `v-bind:href`。

相似地，你还可以将一个函数绑定到动态的事件名称上：

```vue
<a v-on:[eventName]="doSomething"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething">
```

在此示例中，当 `eventName` 的值是 "focus" 时，`v-on:[eventName]` 就等价于 `v-on:focus`。

#### 动态参数值的限制

动态参数期望结果为一个字符串，或者是 null。特殊值 null 意为显式移除该绑定。任何其他非字符串的值都将触发一个警告。

#### 动态参数语法的限制

动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。例如下面的示例：

```vue
<!-- 这会触发一个编译器警告 -->
<a :['foo' + bar]="value"> ... </a>
```

如果你需要传入一个复杂的动态参数，我们推荐使用计算属性替换复杂的表达式，也是 Vue 最基础的概念之一。
当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写。

### 修饰符

修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。例如 .prevent 修饰符会告知 v-on 指令对触发的事件调用 event.preventDefault()

```vue
<form @submit.prevent="onSubmit">...</form>
```