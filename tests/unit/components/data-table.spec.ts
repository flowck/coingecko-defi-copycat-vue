import rows from "../../fixtures/rows.json";
import { shallowMount } from "@vue/test-utils";
import DataTable from "@/common/components/data-table/data-table.vue";

describe("DataTable.vue", () => {
  let dataTable = shallowMount(DataTable, { props: { rows: [], columns: [] } });
  const columns = [
    { name: "index", label: "#" },
    { name: "name", label: "Coin" },
    { name: "price", label: "Price" },
    { name: "marketCapitalization", label: "Market Capitalization" },
    { name: "fullyDilutedMarketCap", label: "Fully Diluted Mkt. Cap" },
  ];

  beforeEach(() => {
    dataTable = shallowMount(DataTable, {
      props: { columns, rows },
      slots: {
        "table-row": "<td></td>",
      },
    });
  });

  it("Expect selected column to have property aria-sort set to ascending", async () => {
    const columnHeader = dataTable.find("th");
    await columnHeader.trigger("click");
    expect(columnHeader.attributes()["aria-sort"]).toBe("ascending");
  });

  it("Expect selected column to have property aria-sort set to descending after the second click", async () => {
    const columnHeader = dataTable.find("th");
    await columnHeader.trigger("click");
    await columnHeader.trigger("click");
    expect(columnHeader.attributes()["aria-sort"]).toBe("descending");
  });
});
