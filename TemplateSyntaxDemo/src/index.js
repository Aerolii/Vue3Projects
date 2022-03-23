import { ref, createApp } from 'vue'

export const TemplateComponent = {
  setup(props) {
    const count = ref(0)
    return {
      count
    }
  },

  template:'#templateComponent'
}

createApp(TemplateComponent).mount('#app')
