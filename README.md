<h1 align="center">AutoToMore</h1>

<center>

  [![Static Badge](https://img.shields.io/npm/v/auto-to-more)](https://www.npmjs.com/package/auto-to-more)
  ![npm](https://img.shields.io/npm/dm/auto-to-more)
  ![Codecov](https://img.shields.io/codecov/c/github/JCheng-Haixin/juKfJNJcbSfVQm1QjMjTyeKX4lhGghgsm)

</center>

# auto-to-more
一个基于 `Vue3` `Teleport` 实现的溢出传送组件。例子：当一个元素中拥有多个元素，又不需要全部展示时，可将多余的元素隐藏至指定位置，再通过指定的元素与触发条件来展示这些被暂时隐藏的元素。

# 效果
默认最多展示3个元素。当超出3个时，从第3个元素开始会被隐藏至 `OverflowContent` 中，`OverflowContent` 从 `overflow-content` 插槽中获取。在使用时可自定义 `OverflowContent` 的位置，以及其展示触发控件。

# 安装
```
npm i auto-to-more
```

# 使用
```html
<script setup lang="ts">
  import { AutoOverflow, AutoOverflowChild } from 'auto-to-more';
</script>

<template>
  <!-- max-count(number) 默认最大展示个数 3 -->
  <AutoOverflow :max-count="3">
    <AutoOverflowChild>
      <button>1</button>
    </AutoOverflowChild>
    <AutoOverflowChild>
      <button>2</button>
    </AutoOverflowChild>
    <AutoOverflowChild>
      <button>3</button>
    </AutoOverflowChild>
    <AutoOverflowChild>
      <button>4</button>
    </AutoOverflowChild>
    <AutoOverflowChild>
      <button>5</button>
    </AutoOverflowChild>
    
    <template #overflow-content="{ OverflowContent }">
      <!-- 
        OverflowContent 的 tag 默认为 div，默认 class 为 overflow-box：
        <div class="overflow-box"><slot /></div>
      -->
      <component :is="OverflowContent" tag="div"></component>
    </template>
  </AutoOverflow>
</template>
```

# AutoToMore API
## AutoOverflow Attributes
| 属性名 | 说明 | 类型 | 默认值 |
| ----- | --- | --- | ----- |
| max-count | 子元素最大展示个数 | number | 3 |

## AutoOverflow Slots
| 插槽名 | 说明 |
| ----- | --- |
| default | 自定义默认内容 |
| overflow-content | 溢出内容被传送的目标 |

## OverflowContent Attributes
| 属性名 | 说明 | 类型 | 默认值 |
| ----- | --- | --- | ----- |
| tag | 组件的标签 | string | div |

> `OverflowContent` 属性可进行透传
