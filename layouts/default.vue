<template>
  <main>
    <div class="layout-wrapper">
      <header>
        <div class="top-bar">
          <b-button
            class="back-button"
            variant="link"
            @click="to"
            v-if="$nuxt.$route.path !== '/'"
          >
            <b-icon class="icon" icon="arrow-left" />
            Terug
          </b-button>
          <p class="page-title">
            title
          </p>
        </div>
      </header>
      <Nuxt />
    </div>
    <footer>
      <tab-bar :menuItems="menu"></tab-bar>
    </footer>
  </main>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          url: "/",
          title: "Home",
          icon: "book"
        },
        {
          url: "/utilities",
          title: "Utilities",
          icon: "tags"
        }
      ]
    };
  },
  methods: {
    to() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
main {
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
}

header {
  display: flex;
  align-items: center;
  height: calc(55px + env(safe-area-inset-top));
  background: #ccc;
  padding: 0 20px;
  padding-top: env(safe-area-inset-top);
}

.top-bar {
  position: relative;
  text-align: center;
  width: 100%;
}
.page-title:first-letter {
  text-transform: capitalize;
}

.back-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-decoration: none;
  left: 0;
  .icon {
    position: relative;
    top: 2px;
  }
  &:focus {
    outline: none;
  }
}

.layout-wrapper {
  grid-template-rows: auto 1fr;
  display: grid;
}

.page-wrapper {
  width: 100%;
  padding-bottom: 20px;
}

footer {
  height: calc(50px + env(safe-area-inset-bottom));
  background: #ccc;
  padding: 0 10px;
}

@media only screen and (min-width: 767px) {
  main {
    height: 100vh;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .page-wrapper {
    margin: 0 auto;
  }

  .layout-wrapper {
    order: 2;
  }

  footer {
    height: 100%;
    padding-top: 60px;
  }
}
</style>
