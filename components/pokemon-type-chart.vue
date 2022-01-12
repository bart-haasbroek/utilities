<template>
  <div>
    <div class="flex">
      <b-form-select
        v-model="type1"
        :options="getOptions"
        size="md"
        class="mt-3 mr-3"
      ></b-form-select>
      <b-form-select
        v-model="type2"
        :options="getOptions"
        size="md"
        class="mt-3"
      ></b-form-select>
    </div>
    <b-button class="mt-3" @click="getTypes" :disabled="!type1"
      >Zoeken</b-button
    >

    <div class="mt-3" v-if="data">
      <div class="mt-3 type-chart">
        <div>
          <div class="type-chart__category">
            Super effective tegen {{ typeToCheck }}
            <p>(type -> {{ typeToCheck }} = super effective)</p>
          </div>

          <b-list-group>
            <b-list-group-item
              v-for="(type, index) in data.superEffective"
              :key="index + type"
            >
              {{ type }}
            </b-list-group-item>
          </b-list-group>
        </div>
        <div>
          <div class="type-chart__category">
            Niet effectief tegen {{ typeToCheck }}
            <p>(type -> {{ typeToCheck }} = Not very effective)</p>
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
            {{ typeToCheck }} is super effectief tegen:
            <p>({{ typeToCheck }} --> type = super effective)</p>
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
            <p>({{ typeToCheck }} --> type = not very effective)</p>
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
import { uniquify } from "../helpers";
export default {
  data() {
    return {
      typeToCheck: "",
      type1: null,
      type2: null,
      data: "",
      options: [
        { value: null, text: "Selecteer een type" },
        {
          text: "Normal",
          value: "normal"
        },
        {
          text: "Fighting",
          value: "fighting"
        },
        {
          text: "Flying",
          value: "flying"
        },
        {
          text: "Poison",
          value: "poison"
        },
        {
          text: "Ground",
          value: "ground"
        },
        {
          text: "Rock",
          value: "rock"
        },
        {
          text: "Bug",
          value: "bug"
        },
        {
          text: "Ghost",
          value: "ghost"
        },
        {
          text: "Steel",
          value: "steel"
        },
        {
          text: "Fire",
          value: "fire"
        },
        {
          text: "Water",
          value: "water"
        },
        {
          text: "Grass",
          value: "grass"
        },
        {
          text: "Electric",
          value: "electric"
        },
        {
          text: "Psychic",
          value: "psychic"
        },
        {
          text: "Ice",
          value: "ice"
        },
        {
          text: "Dragon",
          value: "dragon"
        },
        {
          text: "Fairy",
          value: "fairy"
        },
        {
          text: "Dark",
          value: "dark"
        }
      ]
    };
  },
  methods: {
    async getTypes() {
      const typeToCheck = this.type2
        ? `${this.type1}/${this.type2}`
        : this.type1;
      let { data } = await this.$axios.get(
        `/api/pokemon-types?type=${typeToCheck}`
      );

      const doubleVulnerability = data["doubleVulnerability"] || [];

      const combinedVulnerability = uniquify([
        ...doubleVulnerability,
        ...data.vulnerableTo
      ]);
      this.data = {
        ...data,
        superEffective: combinedVulnerability.map((t, index) => {
          const multiplier = index < doubleVulnerability.length ? 4 : 2;
          return `${t} (${multiplier}x Effective)`;
        })
      };
      this.typeToCheck = typeToCheck;
    }
  },
  computed: {
    getOptions() {
      return this.options.map(type => {
        return {
          ...type,
          disabled: type.value === this.type1 || type.value === this.type2
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.type-chart {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 16px;

  &__category {
    font-size: 14px;
    margin-bottom: 5px;
  }
}
</style>
