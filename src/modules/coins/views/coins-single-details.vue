<template>
  <section class="view coin">
    <div v-if="coin" class="coin__name is-flex is-flex--vertical-center">
      <img :src="coin.image.small" :alt="coin.name" />
      <h1>{{ coin.name }}</h1>
      <span>({{ coin.symbol }})</span>
    </div>

    <div class="coin__stats spacing-top--large" v-if="coin">
      <stat-card label="Current price" :value="currentPrice" />
      <stat-card label="Market cap" :value="marketCap" />
      <stat-card label="Market cap ranking" :value="marketCapRanking" />
    </div>

    <div class="card spacing-top-bottom--large">
      <time-series-chart
        v-if="historicalData.length"
        :series="historicalData[0]"
      />
    </div>

    <!-- ABOUT -->
    <article class="card coin__about" v-if="coin && coin.description.en">
      <h1>About {{ coin.name }}</h1>

      <div v-html="coin.description.en"></div>
    </article>

    <!-- STATS -->
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { COINS_MODULE } from "../store/coins.constants";
import { numberToCurrency } from "@/common/utils/currency";

export default defineComponent({
  components: {},
  computed: {
    ...mapState(COINS_MODULE, ["coin", "historicalData", "vsCurrency"]),
    currentPrice(): string {
      if (!this.coin) {
        return "";
      }

      return numberToCurrency(
        this.coin.market_data.current_price[this.vsCurrency.toLowerCase()],
        this.vsCurrency
      );
    },
    marketCap(): string {
      if (!this.coin) {
        return "";
      }

      return numberToCurrency(
        this.coin.market_data.market_cap[this.vsCurrency.toLowerCase()],
        this.vsCurrency
      );
    },
    marketCapRanking() {
      return this.coin ? this.coin.market_data.market_cap_rank : "";
    },
  },
  methods: {
    ...mapActions(COINS_MODULE, ["getSingleCoin", "getCoinHistoricalData"]),
  },
  async created() {
    const { coinId } = this.$route.params;
    await this.getSingleCoin(coinId);
    await this.getCoinHistoricalData(coinId);
  },
});
</script>

<style lang="scss" scoped>
.coin {
  &__stats {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  &__name {
    img {
      width: 46px;
      height: 46px;
    }

    h1 {
      margin: 0 20px;
      font-size: 32px;
    }

    span {
      font-size: 18px;
      text-transform: uppercase;
    }
  }

  &__about {
    h1 {
      margin-bottom: 15px;
    }
  }
}
</style>
