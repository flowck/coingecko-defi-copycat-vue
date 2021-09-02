<template>
  <div class="data-select">
    <label v-if="label" for="data-select" class="data-select__label">
      {{ label }}
    </label>
    <select
      name="data-select"
      @change="onChange"
      :value="getDefaultValue"
      class="data-select__list"
      :id="`data-select-${Date.now()}`"
    >
      <option
        :key="index"
        :value="item[keyValue]"
        v-for="(item, index) in data"
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
    defaultValue: { type: String },
    data: {
      type: Object as PropType<Record<string, string | number>[]>,
      required: true,
    },
  },
  computed: {
    getDefaultValue(): string | number {
      return this.defaultValue || this.data.length
        ? this.data[0][this.keyValue as string]
        : "";
    },
  },
  methods: {
    onChange(event: Event) {
      this.$emit("onChange", (event.target as HTMLSelectElement).value);
    },
  },
});
</script>

<style lang="scss" scoped src="./data-select.scss"></style>
