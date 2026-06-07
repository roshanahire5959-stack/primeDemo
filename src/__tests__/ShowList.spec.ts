import { beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ShowList from "@/components/ShowList.vue";
import { useTvShowsStore } from "@/store/tvShowsData";
import { makeShow } from "./testUtils";

describe("ShowList", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.restoreAllMocks();
  });

  it("loads shows and renders first paginated page", async () => {
    const shows = Array.from({ length: 25 }, (_, index) => makeShow(index + 1));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(shows),
      }),
    );

    const wrapper = mount(ShowList, {
      global: {
        stubs: {
          ShowCard: {
            props: ["show"],
            template: '<li class="show-card">{{ show.name }}</li>',
          },
        },
      },
    });
    await flushPromises();

    const store = useTvShowsStore();
    expect(store.allShows).toHaveLength(20);
    expect(wrapper.findAll(".show-card")).toHaveLength(20);
    expect(wrapper.text()).toContain("1 / 2");
  });

  it("moves to next page", async () => {
    const shows = Array.from({ length: 25 }, (_, index) => makeShow(index + 1));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(shows),
      }),
    );

    const wrapper = mount(ShowList, {
      global: {
        stubs: {
          ShowCard: {
            props: ["show"],
            template: '<li class="show-card">{{ show.name }}</li>',
          },
        },
      },
    });
    await flushPromises();

    const nextButton = wrapper.findAll("button")[2];
    if (!nextButton) {
      throw new Error("Next button not found");
    }
    await nextButton.trigger("click");
    await flushPromises();

    const store = useTvShowsStore();
    expect(store.allShows).toHaveLength(5);
    expect(wrapper.text()).toContain("2 / 2");
  });

  it("shows empty state when API returns no shows", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      }),
    );

    const wrapper = mount(ShowList);
    await flushPromises();

    expect(wrapper.text()).toContain("No Data Found !");
  });
});
