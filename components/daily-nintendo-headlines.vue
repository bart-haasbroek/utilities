<template>
  <div>
    <b-button class="mt-3" @click="getHeadlines" :disabled="isLoading">
      Headlines ophalen
    </b-button>
    <!--
    <b-button class="mt-3" @click="getWp" :disabled="isLoading">
      wp response ophalen
    </b-button> -->

    <div class="mt-3">
      <b-list-group v-if="headlines">
        <b-list-group-item v-for="(headline, index) in headlines" :key="index">
          {{ headline }}
        </b-list-group-item>
      </b-list-group>
      <div class="d-flex" v-if="isLoading">
        <b-spinner></b-spinner>
        <span class="mt-1 px-3"> Ophalen... </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headlines: "",
      isLoading: false,
      data: "",
    };
  },
  methods: {
    async getHeadlines() {
      this.isLoading = true;
      let { data } = await this.$axios.post(`/api/scrape-site`, {
        url: "https://www.dailynintendo.nl",
        regex: [
          {
            regex: "<main .*?>.*?<\/main>",
          },
          {
            regex: "<h4> (<a.*?>(.*?)<\/a>)",
            resultTemplate: "Titel: $2",
            flags: "g",
          },
        ],
      });
      this.isLoading = false;
      this.headlines = data;
    },
    async getWp() {
      this.isLoading = true;
      let { data } = await this.$axios.get(
        `/api/wp-api-response?site=https://www.ppreviews.nl&data=posts`
      );
      this.isLoading = false;
    },
  },
};
</script>
