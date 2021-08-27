<template>
  <section>
    List coins per market
    <base-stat value="$379,205,276,056" label="ETH Market Cap"></base-stat>
  </section>
</template>

<script lang="ts">
import BaseStat from "@/common/components/base-stat.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListDeFiCoins",
  components: { BaseStat },
});
</script>
