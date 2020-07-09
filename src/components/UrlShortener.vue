<template>
  <div class="home">
    <UrlForm @fetch-urls="fetchShortUrls()" />
    <UrlList v-if="loaded" v-bind:items="items" />
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";

import UrlForm from "@/components/UrlForm.vue";
import UrlList from "@/components/UrlList.vue";
import UrlService, { ShortUrl } from "@/services/UrlService";

@Component({
  components: {
    UrlForm,
    UrlList,
  },
})
export default class UrlShortener extends Vue {
  items: ShortUrl[] = [];
  loaded = false;
  urlService = new UrlService();

  created() {
    this.fetchShortUrls();
  }

  async fetchShortUrls() {
    this.items = await this.urlService.fetchShortUrls();
    this.loaded = true;
  }
}
</script>

<style scoped>
.home > * {
  margin: 1rem 0;
}
</style>
