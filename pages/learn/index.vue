<template>
  <v-container fluid class="secondary">
    <v-container>
      <v-layout align-center justify-space-between row class="mx-5">
        <v-flex xs12 md6>
          <div class="text-xs-left primary--text">
            <h1>
              <span class="headline">欢迎使用</span>
              <br />
              <span class="font-weight-black display-1">EpicLearn</span>
              <br />
              <span class="headline">
                阅读我们提供的优质开源书籍，通过一种更有成效的方法来进行实践学习，以更快实现目标。
              </span>
            </h1>
          </div>
        </v-flex>

        <v-flex v-if="repo" xs12 md5>
          <div>
            <v-card class="mx-auto" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    repo.description
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    模块 - {{ summaryCount }} 节 <br />{{ repo.name }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="125">
                  <v-img
                    src="https://cover.kancloud.cn/epiclearn/thinkphp!middle"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn color="secondary" :to="`${repo.name}/`"
                  >免费开始学习</v-btn
                >
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  data() {
    return {
      content: '',
      summaryCount: null,
      repo: null,
      items: [
        {
          title: 'SteamHub'
        },
        {
          title: 'ThinkPHP'
        }
      ]
    }
  },
  async mounted() {
    const summary = await this.$axios.$get(
      encodeURI(
        `https://api.github.com/repos/EpicLearn/ThinkPHP5.1-Web-Actual-combat/contents/SUMMARY.md`
      )
    )
    const repo = await this.$axios.$get(
      encodeURI(
        `https://api.github.com/repos/EpicLearn/ThinkPHP5.1-Web-Actual-combat`
      )
    )
    this.repo = repo
    Base64.extendString()
    const content = summary.content.fromBase64()
    this.content = content
    const json = this.$md.parse(content, {})
    let summaryCount = 0
    json.forEach(element => {
      if (element.type === 'inline') {
        summaryCount = summaryCount + 1
      }
    })
    this.summaryCount = summaryCount
  }
}
</script>
