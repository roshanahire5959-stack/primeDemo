import type { TVShow } from "@/types";

export const makeShow = (id: number, name = `Show ${id}`): TVShow => ({
  id,
  url: `https://example.com/shows/${id}`,
  name,
  type: "Scripted",
  language: "English",
  genres: ["Drama"],
  status: "Running",
  runtime: 60,
  averageRuntime: 60,
  premiered: "2024-01-01",
  ended: null,
  officialSite: null,
  schedule: {
    time: "20:00",
    days: ["Monday"],
  },
  rating: {
    average: 8,
  },
  weight: 1,
  network: {
    id: 1,
    name: "Test Network",
    country: {
      name: "United States",
      code: "US",
      timezone: "America/New_York",
    },
    officialSite: null,
  },
  webChannel: null,
  dvdCountry: null,
  externals: {
    tvrage: null,
    thetvdb: null,
    imdb: null,
  },
  image: {
    medium: `https://example.com/${id}.jpg`,
    original: `https://example.com/${id}-original.jpg`,
  },
  summary: "<p>Test summary</p>",
  updated: 1,
  _links: {
    self: {
      href: `https://api.tvmaze.com/shows/${id}`,
    },
  },
});

