<template>
  <div class="page-wrapper content-wrapper content-wrapper--narrow">
    <nuxt-content :document="article" />
    <b-form-input
      class="mt-3"
      v-model="letters"
      placeholder="nopdgkias"
    ></b-form-input>
    <b-button class="mt-3" @click="search">Zoeken</b-button>

    <div v-if="matches" class="mt-3">
      <b-list-group v-if="matches.length > 0">
        <b-list-group-item v-for="(match, index) in matches" :key="index">
          {{ match }}
        </b-list-group-item>
      </b-list-group>
      <div v-else>
        Geen artiesten gevonden
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("app/setPagetitle", "Artiesten zoeken");
  },
  data() {
    return {
      letters: "",
      matches: ""
    };
  },
  async asyncData({ $content, params }) {
    const article = await $content("utilities", params.slug).fetch();
    return { article: article[0] };
  },
  methods: {
    async search() {
      const letters = this.letters || "nopdgkias";
      let { data } = await this.$axios.get(
        `/api/search-list?letters=${letters}`
      );
      this.matches = data.orderedMatches;
    }
  }
};
</script>

<style></style>
