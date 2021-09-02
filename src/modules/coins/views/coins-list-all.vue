<template>
  <section class="view">
    <p class="view__description">
      DeFi or Decentralized Finance refers to financial services that are built
      on top of distributed networks with no central intermediaries.
    </p>

    <div class="view__chart-control">
      <data-select
        key-value="name"
        key-label="label"
        label="Currencies"
        :data="vsCurrencies"
        @onChange="onCurrencyChange"
      />

      <data-select
        label="Coins"
        :data="coins"
        key-value="id"
        key-label="name"
        @onChange="onCoinChange"
      />

      <data-select
        label="Category"
        key-label="name"
        key-value="value"
        :data="historicalDataCategories"
        v-if="historicalDataCategories.length"
        @onChange="onHistoricalDataCategoryChange"
      />
    </div>

    <time-series-chart
      v-if="historicalData.length"
      :series="historicalData[historicalDataCategoryIndex]"
    />
    <coins-data-table :coins="coins" :vsCurrency="vsCurrency" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { COINS_MODULE } from "../store/coins.constants";
import { mapActions, mapGetters, mapState } from "vuex";
import CoinsDataTable from "../components/coins-data-table.vue";

export default defineComponent({
  name: "ListDeFiCoins",
  components: { CoinsDataTable },
  data() {
    return {
      historicalDataCategoryIndex: 0,
    };
  },
  computed: {
    ...mapGetters(COINS_MODULE, ["vsCurrency", "historicalDataCategories"]),
    ...mapState(COINS_MODULE, ["coins", "historicalData", "vsCurrencies"]),
  },
  methods: {
    ...mapActions(COINS_MODULE, [
      "setVsCurrency",
      "getVsCurrencies",
      "getCoinHistoricalData",
      "getDeFiCoinsByMarketCap",
    ]),
    onCoinChange(coin: string) {
      this.getCoinHistoricalData(coin);
    },
    onHistoricalDataCategoryChange(categoryIndex: number) {
      this.historicalDataCategoryIndex = categoryIndex;
    },
    async onCurrencyChange(currency: string) {
      this.setVsCurrency(currency);
      await this.getDeFiCoinsByMarketCap();
      await this.getCoinHistoricalData(this.coins[0].id);
    },
  },
  async created() {
    await this.getDeFiCoinsByMarketCap();
    await this.getCoinHistoricalData(this.coins[0].id);
    await this.getVsCurrencies();
  },
});
</script>

<style lang="scss" scoped>
.view {
  &__chart-control {
    display: flex;
    margin: 20px 0;
  }
}
</style>
