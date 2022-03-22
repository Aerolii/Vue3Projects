# Some Vue3 Projects Demo

## Vue3 基础语法

### 模版语法

Vue 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。所有的 Vue 模板都是语法上合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。

在底层机制中，Vue 会将模板编译成高度优化的 JavaScript 代码。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。

#### 文本插值

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)。

#### 原始HTML

双大括号将会将数据插值为纯文本，而不是 HTML。若想插入 HTML，你需要使用 `v-html` 指令。

v-html attribute 被称为一个指令。指令由 v- 作为前缀，表明它们是一些由 Vue 提供的特殊 attribuite，它们将为渲染的 DOM 应用特殊的响应式行为。

#### Attribute绑定

双大括号不能在 HTML attributes 中使用，应该使用 `v-bind` 指令。

##### 简写

开头为`:`的 attribute 可能和一般的 HTML attribute 看起来不太一样，但它的确是合法的 attribute 名称字符，并且所有支持 Vue 的浏览器都能正确解析它。此外，他们不会出现在最终渲染的标签中。

##### 布尔型 Attribute

布尔型 attribute 依据 true / false 值来决定 attribute 是否应该存在于该元素上。

当 attribute 为真值或一个空字符串 (即 `attribute=""`) 时，元素会包含这个 attribute。而当其为假值时 attribute 将被忽略。因此，可简短生命`attribute`。

##### 动态绑定多个值

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
