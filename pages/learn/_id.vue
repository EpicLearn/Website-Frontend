<template>
  <div>
    <v-navigation-drawer fixed app>
      <v-list nav>
        <template v-for="(item, key) in drawerHeader">
          <v-list-group :key="key">
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-title>
                  <span v-html="$md.render(item.content)"></span>
                </v-list-item-title>
              </v-list-item>
            </template>
            <div v-for="(child, i) in drawerContent" :key="i">
              <v-list-item
                v-if="
                  child.map[0] > drawerHeaderMap[key] &&
                    child.map[0] < drawerHeaderMap[key + 1]
                "
              >
                <v-list-item-title class="text-xs-left">
                  <v-btn
                    :to="`${child.children[0].attrs[0][1].split('.md')[0]}`"
                  >
                    <span> {{ child.children[1].content }}</span>
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </div>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <nuxt-child class="mx-2"></nuxt-child>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  data() {
    return {
      drawer: null,
      drawerHeader: null,
      drawerHeaderMap: null,
      drawerContent: null
    }
  },
  async mounted() {
    const bookName = this.$route.path.split('/')[2]
    this.$store.commit('setBookName', bookName)
    const summary = await this.$axios.$get(
      encodeURI(
        `https://api.github.com/repos/EpicLearn/${
          this.$store.state.bookName
        }/contents/SUMMARY.md`
      )
    )
    Base64.extendString()
    const content = summary.content.fromBase64()
    const json = this.$md.parse(content, {})
    const drawerHeader = []
    const drawerHeaderMap = []
    const drawerContent = []
    json.forEach(element => {
      if (element.type === 'inline' && element.level === 3) {
        drawerHeader.push(element)
        drawerHeaderMap.push(element.map[0])
      } else if (element.type === 'inline' && element.level === 5) {
        drawerContent.push(element)
      }
    })
    this.drawer = json
    this.drawerHeader = drawerHeader
    this.drawerHeaderMap = drawerHeaderMap
    this.drawerContent = drawerContent
  }
}
</script>

<style>
.v-list-item__title p {
  margin-bottom: 0 !important;
}
</style>
