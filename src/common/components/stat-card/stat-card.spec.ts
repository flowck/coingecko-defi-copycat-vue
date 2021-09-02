import BaseStat from "./stat-card.vue";
import { shallowMount } from "@vue/test-utils";

describe("base-stat.vue", () => {
  it("Should not render the label element in the absence of label property", () => {
    const baseState = shallowMount(BaseStat, {
      props: { value: "$136,487,589,604", label: "" },
    });

    expect(baseState.find("span.stat__label").exists()).toBe(false);
  });
});
