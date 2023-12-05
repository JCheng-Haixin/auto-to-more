import type { App } from 'vue'
import AutoOverflow from './AutoOverflow.vue'
 
// 使用install方法，在app.use挂载
AutoOverflow.install = (app: App) => {
  app.component(AutoOverflow.__name as string, AutoOverflow)
}
 
export default AutoOverflow