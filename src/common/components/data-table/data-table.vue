<template>
  <div class="data-table">
    <table class="data-table__table" aria-label="data-table">
      <thead class="data-table__table__head">
        <tr>
          <th
            :key="index"
            :id="`column_${column.name}`"
            v-for="(column, index) in columns"
            @click.prevent="sortData(column.name)"
            :aria-sort="sortColumn === column.name ? sortDirection : ''"
          >
            {{ column.label || column.name }}
          </th>
        </tr>
      </thead>

      <tbody class="data-table__table__body">
        <tr :key="row.index" name="table-row" v-for="row in sortedData">
          <slot :row="row" :isColumnActive="isColumnActive"></slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SORT_DIRECTION } from "./data-table.enums";
import { TableColumn, TableRow } from "./data-table.interfaces";

export default defineComponent({
  props: {
    rows: { type: Object as PropType<TableRow[]>, required: true },
    columns: { type: Object as PropType<TableColumn[]>, required: true },
  },
  data() {
    return {
      sortColumn: "",
      sortDirection: "",
    };
  },
  methods: {
    isColumnActive(columnName: string) {
      return this.sortColumn === columnName;
    },
    sortData(column: string) {
      this.sortDirection =
        this.sortDirection === SORT_DIRECTION.ASC
          ? SORT_DIRECTION.DESC
          : SORT_DIRECTION.ASC;

      this.sortColumn = column;
    },
    prepareColumn(column: unknown): string | number {
      return typeof column === "string"
        ? column.toLowerCase()
        : (column as number);
    },
    sortHandler(a: TableRow, b: TableRow) {
      const colA = this.prepareColumn(a[this.sortColumn]);
      const colB = this.prepareColumn(b[this.sortColumn]);

      // Ascending
      if (this.sortDirection === SORT_DIRECTION.ASC) {
        return colA < colB ? -1 : 1;
      }

      // Descending
      if (this.sortDirection === SORT_DIRECTION.DESC) {
        return colA < colB ? 1 : -1;
      }

      // Equal
      return 0;
    },
  },
  computed: {
    sortedData() {
      if (!(this.sortDirection && this.sortColumn)) {
        return this.rows;
      }

      return [...this.rows].sort(this.sortHandler);
    },
  },
});
</script>

<style lang="scss" scoped src="./data-table.scss"></style>
