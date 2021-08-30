<template>
  <div class="time-series-chart">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script lang="ts">
import { Chart } from "highcharts-vue";
import { defineComponent, PropType } from "vue";
import { HistoricalData } from "@/modules/coins/store/interfaces";

export default defineComponent({
  components: {
    highcharts: Chart,
  },
  props: {
    series: {
      type: Object as PropType<HistoricalData>,
      required: true,
    },
  },
  computed: {
    chartOptions() {
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
            format: "${value:.2f}",
          },
          title: "",
        },
        series: [this.series],
      };
    },
  },
});
</script>
