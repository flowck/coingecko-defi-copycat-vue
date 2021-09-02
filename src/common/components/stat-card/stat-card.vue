<template>
  <article class="stat">
    <h1 class="stat__value">{{ value }}</h1>
    <span class="stat__label" v-if="label">{{ label }}</span>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface Stat {
  label: string;
  value: string | number;
}

export default defineComponent({
  props: {
    label: { type: String },
    value: { type: String, required: true },
  },
});
</script>

<style lang="scss" scoped src="./stat-card.scss"></style>
