<template>
  <div class="url-form">
    <label for="url">Paste your long URL here</label><br />
    <input type="text" class="rounded-input" id="url" v-model="url" />
    <button :disabled="invalidUrl()" v-on:click="createShortUrl()">
      Shorten URL
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UrlService from "@/services/UrlService";
import { isWebUri } from "valid-url";

@Component
export default class UrlForm extends Vue {
  url = "";

  urlService = new UrlService();

  invalidUrl() {
    return !isWebUri(this.url);
  }

  async createShortUrl() {
    await this.urlService.createShortUrl(this.url);
    this.$emit("fetch-urls");
    this.url = "";
  }
}
</script>

<style scoped>
input[type="text"] {
  margin-right: 0.5rem;
  min-width: 50%;
  padding: 0.75rem;
  border-radius: 20px;
  font-size: 1rem;
}

input[type="text"]:focus {
  outline: none;
}

button {
  width: 12.5rem;
  margin: 0.5rem 0;
  padding: 1rem 3.125rem;
  background-color: #00c3b9;
  color: #05053c;
  border: none;
  border-radius: 0.3125rem;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.2);
  font-weight: 700;
  font-size: 1rem;
  overflow: hidden;
  cursor: pointer;
}
button:disabled {
  background-color: lightgray;
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.2);
}
</style>
