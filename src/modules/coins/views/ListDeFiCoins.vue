<template>
  <section class="view">
    <p class="view__description">
      DeFi or Decentralized Finance refers to financial services that are built
      on top of distributed networks with no central intermediaries.
    </p>

    <div class="view__chart-control">
      <data-select
        label="Coins"
        :data="coins"
        key-label="name"
        key-value="index"
        @change="onCoinChange"
      ></data-select>

      <data-select
        label="Category"
        key-label="name"
        :data="historicalData"
        v-if="historicalData.length"
        @change="onHistoricalDataCategoryChange"
      >
      </data-select>
    </div>

    <time-series-chart
      v-if="historicalData.length"
      :series="historicalData[historicalDataCategoryIndex]"
    />
    <coins-list :coins="coins" :vsCurrency="vsCurrency" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { COINS_MODULE } from "../store/coinsModule";
import CoinsList from "../components/coins-list.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import DataSelect from "@/common/components/data-select/data-select.vue";
import TimeSeriesChart from "@/common/components/time-series-chart/time-series-chart.vue";

export default defineComponent({
  name: "ListDeFiCoins",
  components: { CoinsList, TimeSeriesChart, DataSelect },
  data() {
    return {
      historicalDataCategoryIndex: 0,
    };
  },
  computed: {
    ...mapGetters(COINS_MODULE, ["vsCurrency"]),
    ...mapState(COINS_MODULE, ["coins", "historicalData"]),
  },
  methods: {
    ...mapActions(COINS_MODULE, [
      "getDeFiCoinsByMarketCap",
      "getCoinHistoricalData",
    ]),
    onCoinChange({ target }: InputEvent) {
      const value = (target as HTMLInputElement).value;
      this.getCoinHistoricalData(value);
    },
    onHistoricalDataCategoryChange(event: Event) {
      this.historicalDataCategoryIndex = Number(
        (event.target as HTMLInputElement).value
      );
    },
  },
  async created() {
    await this.getDeFiCoinsByMarketCap();
    await this.getCoinHistoricalData(this.coins[0].id);
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
