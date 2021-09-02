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

<style lang="scss" scoped>
.stat {
  padding: 10px;
  border-radius: 4px;
  overflow-y: hidden;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &__value {
    font-size: 1.25rem;
    font-weight: normal;
    margin-bottom: 2px;
  }

  &__label {
    font-size: 0.875rem;
  }
}
</style>
