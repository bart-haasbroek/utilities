<template>
  <div class="page-wrapper content-wrapper content-wrapper--narrow">
    <nuxt-content :document="article" />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("app/setPagetitle", this.article.title);
  },
  async asyncData({ $content, params }) {
    const article = await $content("utilities", params.slug).fetch();
    return { article: article };
  },
};
</script>

<style></style>
