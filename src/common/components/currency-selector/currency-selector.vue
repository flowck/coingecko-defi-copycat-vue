<template>
  <div>
    <data-select
      key-value="name"
      key-label="label"
      default-value="usd"
      :data="vsCurrencies"
      v-if="vsCurrencies.length"
      @onChange="onCurrencyChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { COINS_MODULE } from "@/modules/coins/store/coins.constants";

export default defineComponent({
  computed: {
    ...mapState(COINS_MODULE, ["vsCurrencies", "vsCurrency"]),
  },
  methods: {
    ...mapActions(COINS_MODULE, ["onCurrencyChange", "getVsCurrencies"]),
  },
  async created() {
    await this.getVsCurrencies();
  },
});
</script>
