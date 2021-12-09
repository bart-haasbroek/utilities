<template>
  <div class="page-wrapper content-wrapper">
    <app-grid :columns="3">
      <b-card
        v-for="utility in articles"
        :key="utility.id"
        :title="utility.title"
        :sub-title="utility.summary"
      >
        <NuxtLink
          :to="{ name: 'utilities-slug', params: { slug: utility.slug } }"
        >
          Verder
        </NuxtLink>
      </b-card>
    </app-grid>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("app/setPagetitle", "Home");
  },
  async asyncData({ $content, params }) {
    const articles = await $content("utilities").fetch();
    return { articles };
  },
  data() {
    return {
      utilities: [
        {
          id: 1,
          title: "Artiesten zoeken",
          description: "Vind artiesten op basis van een serie letters",
          name: "artist-search"
        }
      ]
    };
  }
};
</script>
