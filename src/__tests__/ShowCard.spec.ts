import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ShowCard from "@/components/ShowCard.vue";
import { makeShow } from "./testUtils";

describe("ShowCard", () => {
  it("renders show name and image", () => {
    const show = makeShow(1, "Breaking Bad");
    const wrapper = mount(ShowCard, {
      props: { show },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>",
          },
        },
      },
    });

    expect(wrapper.text()).toContain("Breaking Bad");
    expect(wrapper.find("img").attributes("src")).toBe(show.image?.medium);
    expect(wrapper.find("img").attributes("alt")).toBe("Breaking Bad");
  });

  it("shows fallback when image is missing", () => {
    const show = {
      ...makeShow(2, "No Poster Show"),
      image: null,
    };
    const wrapper = mount(ShowCard, {
      props: { show },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>",
          },
        },
      },
    });

    expect(wrapper.text()).toContain("No image");
    expect(wrapper.find("img").exists()).toBe(false);
  });
});

