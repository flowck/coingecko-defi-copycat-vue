import { shallowMount } from "@vue/test-utils";
import BaseStat from "@/common/components/base-stat.vue";

describe("base-stat.vue", () => {
  it("Should not render the label element in the absence of label property", () => {
    const baseState = shallowMount(BaseStat, {
      props: { value: "$136,487,589,604", label: "" },
    });

    expect(baseState.find("span.stat__label").exists()).toBe(false);
  });
});
