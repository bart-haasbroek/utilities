<template>
  <div class="tab-bar">
    <nuxtLink
      class="button tab-bar__button"
      v-for="(menuItem, index) of menuItems"
      :key="index"
      :to="menuItem.url"
    >
      <div class="tab-bar__button-icon">
        <b-icon class="icon" :icon="menuItem.icon" />
      </div>
      {{ menuItem.title }}
    </nuxtLink>
  </div>
</template>

<script>
export default {
  props: ["menuItems"]
};
</script>

<style lang="scss">
.tab-bar {
  display: flex;
  &__button {
    text-align: center;
    text-decoration: none;
    background: transparent;
    font-size: 12px;
    color: black;
    padding: 0;
    height: 50px;
  }
  &__button-icon {
    width: 22px;
    height: 22px;
    margin: 0 auto;
    margin-bottom: 2px;
    margin-top: 4px;
  }

  .icon {
    width: 100%;
    height: 100%;
  }
}
@media only screen and (min-width: 767px) {
  .tab-bar {
    width: 100px;
    display: block;

    &__button {
      font-size: 15px;
      height: 80px;
      margin-bottom: 20px;
      transition: background-color 0.4s ease;
      height: 100%;
      padding: 10px 0;

      &.nuxt-link-exact-active {
        background: #999;
      }

      &:hover {
        background: #999;
      }
    }

    &__button-icon {
      width: 40px;
      height: 40px;
      margin-bottom: 5px;
    }
  }
}
</style>
