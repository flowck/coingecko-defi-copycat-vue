<template>
  <div class="time-series-chart">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script lang="ts">
import { Chart } from "highcharts-vue";
import { defineComponent, PropType } from "vue";
import { numberToCurrency } from "@/common/utils/currency";
import { HistoricalData } from "@/modules/coins/store/coins.interfaces";
import { AxisLabelsFormatterContextObject, Time } from "highcharts";

export default defineComponent({
  components: {
    highcharts: Chart,
  },
  props: {
    series: {
      type: Object as PropType<HistoricalData>,
      required: true,
    },
    currency: { type: String, required: true },
  },
  computed: {
    currencySymbol(): string {
      const currency = this.currency.toUpperCase();
      const symbols: Record<string, string> = {
        USD: "$",
        EUR: "€",
        GBP: "£",
      };

      return symbols[currency] || currency;
    },
    chartOptions() {
      const currency = this.currency;
      const timestampToDate = this.timestampToDate;
      return {
        chart: { zoomType: "x" },
        credits: {
          text: "Source code",
          href: "https://gitlab.com/firmino.changani/coingecko-defi-copycat-vue",
        },
        title: { text: "" },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            month: "%e. %b",
            year: "%b",
          },
        },
        yAxis: {
          labels: {
            formatter: (_self: AxisLabelsFormatterContextObject) => {
              return numberToCurrency(_self.value as number, this.currency);
            },
          },
          title: "",
        },
        series: [this.series],
        tooltip: {
          formatter: function () {
            const _self = this as unknown as Record<string, number>;
            return ` <b>${numberToCurrency(
              _self.y,
              currency
            )}</b> <br /> ${timestampToDate(_self.x)}`;
          },
        },
      };
    },
  },
  methods: {
    timestampToDate(value: number): string {
      const time = new Time({});
      return time.dateFormat("%Y-%m-%d %H:%M:%S", value);
    },
  },
});
</script>
