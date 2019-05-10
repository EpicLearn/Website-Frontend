import Vue from 'vue'
import Vuetify from 'vuetify'

const opts = {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#fff',
        secondary: '#3f51b5',
        accent: '#673ab7',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3',
        success: '#4caf50'
      }
    }
  },
  icons: {
    iconfont: 'fa'
  }
}

Vue.use(Vuetify)

export default ({ app }) => {
  app.vuetify = new Vuetify(opts)
}
