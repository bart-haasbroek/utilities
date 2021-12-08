<template>
  <div class="page-wrapper content-wrapper">
    <app-grid :columns="3">
      <b-card
        v-for="utility in utilities"
        :key="utility.id"
        :title="utility.title"
        :sub-title="utility.description"
      >
        <NuxtLink
          :to="{ name: 'utilities-name', params: { name: 'artist-search' } }"
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
