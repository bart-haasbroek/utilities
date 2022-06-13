<template>
  <div>
    <b-form-input
      class="mt-3"
      v-model="request.url"
      placeholder="url"
    ></b-form-input>
    <b-button class="mt-3" @click="scrape">Zoeken</b-button>

    <!-- <div v-if="response" class="mt-3">
      <b-list-group v-if="matches.length > 0">
        <b-list-group-item v-for="(match, index) in matches" :key="index">
          {{ match }}
        </b-list-group-item>
      </b-list-group>
      <div v-else>
        Geen artiesten gevonden
      </div>
    </div> -->
    <div v-if="response" class="mt-3">
      <b-list-group v-if="responseIsArray">
        <b-list-group-item v-for="(row, index) in response" :key="index">
          <div v-html="row"></div>
        </b-list-group-item>
      </b-list-group>
      <div v-else>
        {{ response }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responseIsArray: null,
      response: null,
      // request: {
      //   url: "https://pokemongolive.com/en/news/",
      //   regex: [
      //     {
      //       regex: "<main .*?>.*?<\/main>",
      //     },
      //   ],
      // },
      request: {
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
      },
      //   request: {
      //     url: "https://www.bol.com/nl/nl/p/super-mario-3d-world-bowser-s-fury-switch/9300000009410369/?bltgh=hl-AJxuCI24WyyCau1JAQw.2_36.38.ProductImage",
      //     regex: [
      //       {
      //         regex: "<span .*>([0-9]+)[\\w\\s].*<sup.*?>([0-9-]+)",
      //         resultTemplate: "De prijs is: $1,$2",
      //       },
      //     ],
      //   },
    };
  },
  methods: {
    async scrape() {
      console.log("request", this.request);
      const { url, regex } = this.request;
      let { data } = await this.$axios.post(`/api/scrape-site`, {
        url,
        regex,
      });
      this.responseIsArray = Array.isArray(data);
      this.response = data;
      console.log("data", data, Array.isArray(data));
    },
  },
};
</script>

<style lang="scss"></style>
