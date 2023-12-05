import type { App } from 'vue'
import AutoOverflowChild from './AutoOverflowChild.vue'
 
// 使用install方法，在app.use挂载
AutoOverflowChild.install = (app: App) => {
  app.component(AutoOverflowChild.__name as string, AutoOverflowChild)
}
 
export default AutoOverflowChild