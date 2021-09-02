<template>
  <data-table :rows="coins" :columns="columns" class="coins-list">
    <template v-slot:default="{ row, isColumnActive }">
      <!-- INDEX -->
      <data-table-column :is-active="isColumnActive('index')">
        {{ row.index + 1 }}
      </data-table-column>

      <!-- NAME -->
      <data-table-column :is-active="isColumnActive('name')">
        <div class="coins-list__name">
          <img
            class="coins-list__name__icon"
            :src="row.image"
            :alt="row.name"
          />
          <span class="coins-list__name__label">
            <router-link
              :to="{ name: 'CoinsSingleDetails', params: { coinId: row.id } }"
            >
              {{ row.name }}
            </router-link>
          </span>
          <span class="coins-list__name__symbol">{{ row.symbol }}</span>
        </div>
      </data-table-column>

      <data-table-column :is-active="isColumnActive('price')">
        {{ numberToCurrency(row.price) }}
      </data-table-column>

      <data-table-column :is-active="isColumnActive('marketCapitalization')">
        {{ numberToCurrency(row.marketCapitalization) }}
      </data-table-column>

      <data-table-column :is-active="isColumnActive('fullyDilutedMarketCap')">
        {{ numberToCurrency(row.fullyDilutedMarketCap) }}
      </data-table-column>
    </template>
  </data-table>
</template>

<script lang="ts">
import { Coin } from "../store/coin";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    coins: {
      type: Object as PropType<Coin[]>,
      required: true,
    },
    vsCurrency: { type: String, required: true },
  },
  data() {
    return {
      columns: [
        { name: "index", label: "#" },
        { name: "name", label: "Coin" },
        { name: "price", label: "Price" },
        { name: "marketCapitalization", label: "Market Capitalization" },
        { name: "fullyDilutedMarketCap", label: "Fully Diluted Mkt. Cap" },
      ],
    };
  },
  methods: {
    numberToCurrency(value: number): string {
      if (!value) {
        return "?";
      }

      return value.toLocaleString(undefined, {
        style: "currency",
        currency: this.vsCurrency,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.coins-list {
  margin-top: 50px;

  &__name {
    display: flex;
    align-items: center;

    &__label {
      width: 115px;
      font-weight: bold;
    }

    &__icon {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }

    &__symbol {
      font-size: 0.7rem;
      text-transform: uppercase;
    }
  }
}
</style>
