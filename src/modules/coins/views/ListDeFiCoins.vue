<template>
  <section class="view">
    <p class="view__description">
      DeFi or Decentralized Finance refers to financial services that are built
      on top of distributed networks with no central intermediaries.
    </p>
    <coins-list :coins="coins" :vsCurrency="vsCurrency"></coins-list>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { COINS_MODULE } from "../store/coinsModule";
import CoinsList from "../components/coins-list.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default defineComponent({
  name: "ListDeFiCoins",
  components: { CoinsList },
  computed: {
    ...mapState(COINS_MODULE, ["coins"]),
    ...mapGetters(COINS_MODULE, ["vsCurrency"]),
  },
  methods: {
    ...mapActions(COINS_MODULE, ["getDeFiCoinsByMarketCap"]),
  },
  async created() {
    this.getDeFiCoinsByMarketCap();
  },
});
</script>

<style lang="scss" scoped></style>
