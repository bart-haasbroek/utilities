<template>
  <div>
    <b-button class="mt-3" @click="getHeadlines" :disabled="isLoading">
      Headlines ophalen
    </b-button>

    <div class="mt-3">
      <b-list-group v-if="headlines">
        <b-list-group-item v-for="(headline, index) in headlines" :key="index">
          {{ headline.title }}
        </b-list-group-item>
      </b-list-group>
      <div class="d-flex" v-if="isLoading">
        <b-spinner></b-spinner>
        <span class="mt-1 px-3">
          Ophalen...
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headlines: "",
      isLoading: false
    };
  },
  methods: {
    async getHeadlines() {
      this.isLoading = true;
      let { data } = await this.$axios.get(`/api/daily-nintendo-headlines`);
      this.isLoading = false;
      this.headlines = data.posts;
    }
  }
};
</script>
