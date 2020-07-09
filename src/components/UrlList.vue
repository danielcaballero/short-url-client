<template>
  <table class="url-list" v-if="hasItems()">
    <thead>
      <tr>
        <th scope="col">URL</th>
        <th scope="col">Short URL</th>
        <th scope="col">Created at</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.shortUrl">
        <td data-label="URL">{{ item.url }}</td>
        <td data-label="Short URl">{{ item.shortUrl }}</td>
        <td data-label="Created at">
          {{ new Date(item.createdAt).toLocaleString() }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ShortUrl } from "@/services/UrlService";

@Component
export default class UrlForm extends Vue {
  @Prop({ default: () => [] }) readonly items!: ShortUrl[];

  hasItems() {
    return this.items.length > 0;
  }
}
</script>

<style scoped>
body {
  font-family: "Open Sans", sans-serif;
  line-height: 1.25;
}

.url-list {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

.url-list caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

.url-list tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

.url-list th,
.url-list td {
  padding: 0.625em;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.url-list th {
  background-color: #05053c;
  color: white;
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 1000px) {
  .url-list {
    border: 0;
  }

  .url-list caption {
    font-size: 1.3em;
  }

  .url-list thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .url-list tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  .url-list td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  .url-list td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  .url-list td:last-child {
    border-bottom: 0;
  }
}
</style>
