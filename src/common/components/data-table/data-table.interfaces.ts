export interface TableColumn {
  name: string;
  label: string;
}

export interface TableRow {
  [key: string]: unknown;
}
