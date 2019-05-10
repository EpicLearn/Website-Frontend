<template>
  <div v-if="content" v-html="$md.render(content)"></div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  data() {
    return {
      content: null
    }
  },
  async mounted() {
    const bookName = this.$route.path.split('/')[2]
    this.$store.commit('setBookName', bookName)
    const summary = await this.$axios.$get(
      encodeURI(
        `https://api.github.com/repos/EpicLearn/${
          this.$store.state.bookName
        }/readme`
      )
    )
    Base64.extendString()
    const content = summary.content.fromBase64()
    this.content = content
  },
  head() {
    return {
      title: this.$store.state.bookName + ' | EpicData Docs',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `在 EpicLearn 上阅读并学习${this.$store.state.bookName}`
        }
      ]
    }
  }
}
</script>
