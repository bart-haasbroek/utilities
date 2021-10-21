<template>
  <div class="page-wrapper content-wrapper">
    <b-form-input
      v-model="letters"
      placeholder="Enter your name"
    ></b-form-input>
    <b-button @click="search">Zoeken</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letters: ""
    };
  },
  methods: {
    async search() {
      let { data } = await this.$axios.get(
        "/api/search-list?letters=nopdgkias"
      );
      console.log("dsdsds", this.letters);
      console.log("res", data);
    }
  }
};
</script>

<style></style>
