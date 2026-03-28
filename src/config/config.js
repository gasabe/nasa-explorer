const config = {
  nasa: {
    baseUrl: import.meta.env.VITE_NASA_BASE_URL ?? "https://api.nasa.gov",
    apiKey: import.meta.env.VITE_NASA_API_KEY ?? "DEMO_KEY",
    searchUrl: import.meta.env.VITE_NASA_SEARCH_URL ?? "https://images-api.nasa.gov",
  },
};

export default config;