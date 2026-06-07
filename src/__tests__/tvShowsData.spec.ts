import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useTvShowsStore } from "@/store/tvShowsData";
import { makeShow } from "./testUtils";

describe("tvShowsData store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.restoreAllMocks();
  });

  it("loads shows and stores original data for pagination", async () => {
    const shows = [makeShow(1), makeShow(2)];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(shows),
      }),
    );

    const store = useTvShowsStore();
    await store.getShows();

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BASE_URL}/shows`);
    expect(store.allShows).toEqual(shows);
    expect(store.tempArr).toEqual(shows);
    expect(store.loading).toBe(false);
    expect(store.error).toBe("");
  });

  it("sets error when shows API fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    const store = useTvShowsStore();
    await store.getShows();

    expect(store.error).toBe("Failed to fetch shows (500)");
    expect(store.loading).toBe(false);
  });

  it("maps search API results into allShows", async () => {
    const show = makeShow(10, "Friends");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([{ score: 1, show }]),
      }),
    );

    const store = useTvShowsStore();
    await store.getSearchShows("friends");

    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BASE_URL}/search/shows?q=friends`);
    expect(store.allShows).toEqual([show]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe("");
  });

  it("sets error when search API fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }),
    );

    const store = useTvShowsStore();
    await store.getSearchShows("unknown");

    expect(store.error).toBe("error: 404");
    expect(store.loading).toBe(false);
  });
});

