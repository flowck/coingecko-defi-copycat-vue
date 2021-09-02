<template>
  <section class="view">
    <card>
      <data-table
        class="exchanges"
        v-slot="{ row }"
        v-if="exchanges"
        :rows="exchanges"
        :columns="[nameColumn, ...columns]"
      >
        <data-table-column>
          <div class="exchanges__column-container">
            <img class="exchanges__logo" :src="row.image" :alt="row.name" />
            {{ row.name }}
          </div>
        </data-table-column>

        <data-table-column v-for="column in columns" :key="column.name">
          {{ row[column.name] }}
        </data-table-column>
      </data-table>
    </card>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { EXCHANGES_MODULE } from "../store/exchanges.module";

export default defineComponent({
  computed: {
    ...mapState(EXCHANGES_MODULE, ["exchanges"]),
  },
  methods: {
    ...mapActions(EXCHANGES_MODULE, ["getExchanges"]),
  },
  data() {
    return {
      nameColumn: { name: "name", label: "Name" },
      columns: [
        { name: "year_established", label: "Year extablished" },
        { name: "country", label: "Country" },
        { name: "has_trading_incentive", label: "Trading incentive" },
        { name: "trust_score", label: "Trust score" },
        { name: "trust_score_rank", label: "Trust score rank" },
        { name: "trade_volume_24h_btc", label: "Trade volume 24h (BTC)" },
        {
          name: "trade_volume_24h_btc_normalized",
          label: "Trade volume 24h (BTC normalized)",
        },
      ],
    };
  },
  async created() {
    this.$isLoading(true);
    await this.getExchanges({ page: 1, perPage: 50 });
    this.$isLoading(false);
  },
});
</script>

<style lang="scss" scoped>
.exchanges {
  &__column-container {
    display: flex;
    align-items: center;
  }

  &__logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
</style>
