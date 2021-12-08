<template>
  <div class="page-wrapper content-wrapper content-wrapper--narrow">
    <nuxt-content :document="page" />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("app/setPagetitle", "Over de app");
  },
  async asyncData({ $content }) {
    const page = await $content("pages")
      .where({ title: "About" })
      .fetch();
    return { page: page[0] };
  }
};
</script>

<style></style>
