<template>
  <div>
    <b-form-input
      class="mt-3"
      v-model="typeToCheck"
      placeholder="Zoek een type"
    ></b-form-input>
    <b-button class="mt-3" @click="getTypes" :disabled="!typeToCheck"
      >Zoeken</b-button
    >

    <div class="mt-3" v-if="data">
      <div class="mt-3 type-chart">
        <div>
          <div class="type-chart__category">
            2x effectief tegen {{ typeToCheck }}
          </div>

          <b-list-group>
            <b-list-group-item
              v-for="(type, index) in data.vulnerableTo"
              :key="index + type"
            >
              {{ type }}
            </b-list-group-item>
          </b-list-group>
        </div>
        <div v-if="data['doubleVulnerability']">
          <div class="type-chart__category">
            4x effectief tegen {{ typeToCheck }}
          </div>

          <div v-if="data.doubleVulnerability.length === 0">
            Er zijn geen types 4x effectief
          </div>

          <b-list-group v-else>
            <b-list-group-item
              v-for="(type, index) in data.doubleVulnerability"
              :key="index + type"
            >
              {{ type }}
            </b-list-group-item>
          </b-list-group>
        </div>
        <div>
          <div class="type-chart__category">
            Niet effectief tegen {{ typeToCheck }}
          </div>

          <b-list-group>
            <b-list-group-item
              v-for="(type, index) in data.resistant"
              :key="index + type"
            >
              {{ type }}
            </b-list-group-item>
          </b-list-group>
        </div>
        <div>
          <div class="type-chart__category">
            {{ typeToCheck }} is 2 effectief tegen:
          </div>

          <b-list-group>
            <b-list-group-item
              v-for="(type, index) in data.strongAgainst"
              :key="index + type"
            >
              {{ type }}
            </b-list-group-item>
          </b-list-group>
        </div>
        <div>
          <div class="type-chart__category">
            {{ typeToCheck }} is niet effectief tegen:
          </div>

          <b-list-group>
            <b-list-group-item
              v-for="(type, index) in data.weakAgainst"
              :key="index + type"
            >
              {{ type }}
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeToCheck: "",
      data: ""
    };
  },
  methods: {
    async getTypes() {
      let { data } = await this.$axios.get(
        `/api/pokemon-types?type=${this.typeToCheck}`
      );
      this.data = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.type-chart {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;

  &__category {
    font-size: 14px;
    margin-bottom: 5px;
  }
}
</style>
