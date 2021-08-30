<template>
  <td
    class="data-table-column"
    :class="isActive ? 'data-table-column--active' : ''"
  >
    <slot></slot>
  </td>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isActive: { type: Boolean },
  },
});
</script>

<style lang="scss" scoped>
.data-table-column {
  text-align: left;
  padding: 0 10px;

  &--active {
    background-color: #f9f9f9;
  }
}
</style>
