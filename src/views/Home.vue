<template>
  <div class="home">
    <UrlShortener />
  </div>
</template>

<script>
// @ is an alias to /src
import UrlShortener from "@/components/UrlShortener.vue";

export default {
  name: "Home",
  components: {
    UrlShortener,
  },
};
</script>

<style scoped>
.home {
  font-weight: 500;
  text-align: left;
}
</style>
