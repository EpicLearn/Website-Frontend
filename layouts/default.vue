<template>
  <v-app>
    <v-app-bar absolute app>
      <v-toolbar-title>
        <nuxt-link to="/">{{ title }}</nuxt-link>
      </v-toolbar-title>
      <v-btn text disabled>
        |
      </v-btn>
      <v-btn text>
        Learn
      </v-btn>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-breadcrumbs :items.sync="breadcrumbs">
        <template v-slot:divider>
          <v-icon>forward</v-icon>
        </template>
      </v-breadcrumbs>
      <nuxt />
    </v-content>
    <v-footer fixed app>
      <span>&copy; EpicLearn 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'EpicData',
      breadcrumbs: [
        {
          text: 'Docs',
          disabled: false,
          to: '/',
          exact: true
        }
      ]
    }
  },
  watch: {
    async $route(to, from) {
      const breadcrumbs = await this.$store.state.breadcrumbs
      this.breadcrumbs = breadcrumbs
    }
  },
  async mounted() {
    const breadcrumbs = await this.$store.state.breadcrumbs
    this.breadcrumbs = breadcrumbs
  }
}
</script>
