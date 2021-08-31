<template>
  <div class="data-select">
    <label v-if="label" for="data-select" class="data-select__label">
      {{ label }}
    </label>
    <select
      name="data-select"
      @change="onChange"
      class="data-select__list"
      :id="`data-select-${Date.now()}`"
    >
      <option
        :key="index"
        v-for="(item, index) in data"
        :value="item[keyValue] || index"
      >
        {{ item[keyLabel] }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface DataSelectList {
  value: string;
  lable: string;
}

export default defineComponent({
  props: {
    label: { type: String },
    keyLabel: { type: String },
    keyValue: { type: String },
    data: { type: Object as PropType<unknown[]>, required: true },
  },
  methods: {
    onChange(event: Event) {
      this.$emit("onChange", (event.target as HTMLSelectElement).value);
    },
  },
});
</script>

<style lang="scss" scoped src="./data-select.scss"></style>
