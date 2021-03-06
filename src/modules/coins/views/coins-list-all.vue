<template>
  <section class="view">
    <p class="view__description">
      DeFi or Decentralized Finance refers to financial services that are built
      on top of distributed networks with no central intermediaries.
    </p>

    <card class="is-flex spacing-top-bottom--large">
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
    </card>

    <card class="spacing-bottom--large">
      <time-series-chart
        :currency="vsCurrency"
        v-if="historicalData.length"
        :series="historicalData[historicalDataCategoryIndex]"
      />
    </card>

    <card>
      <coins-data-table :coins="coins" :vsCurrency="vsCurrency" />
    </card>
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
      "getCoinHistoricalData",
      "getDeFiCoinsByMarketCap",
    ]),
    async onCoinChange(coin: string): Promise<void> {
      this.$isLoading(true);
      await this.getCoinHistoricalData(coin);
      this.$isLoading(false);
    },
    onHistoricalDataCategoryChange(categoryIndex: number) {
      this.historicalDataCategoryIndex = categoryIndex;
    },
    async init(): Promise<void> {
      this.$isLoading(true);
      await this.getDeFiCoinsByMarketCap();
      await this.getCoinHistoricalData(this.coins[0].id);
      this.$isLoading(false);
    },
  },
  watch: {
    async vsCurrency() {
      this.init();
    },
  },
  async created() {
    this.init();
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
