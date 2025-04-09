export class SearchDogs {
  constructor(url = "https://frontend-take-home-service.fetch.com") {
    this.baseUrl = url;
  }

  async getDogs({ breeds = [], zipCodes = [], from, sort, size }) {
    try {
      const url = new URL(`${this.baseUrl}/dogs/search`);

      if (breeds.length > 0) {
        url.searchParams.append("breeds", breeds.join(","));
      }

      if (zipCodes.length > 0) {
        url.searchParams.append("zipCodes", zipCodes.join(","));
      }

      if (size) {
        url.searchParams.append("size", size);
      }

      if (from) {
        url.searchParams.append("from", from);
      }

      if (sort) {
        url.searchParams.append("sort", sort);
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch dogs search results: ${response.status}`
        );
      }

      const results = await response.json();
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getDogsFromUrl(urlString) {
    try {
      const url = new URL(`${this.baseUrl}${urlString}`);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch dogs search results: ${response.status}`
        );
      }

      const results = await response.json();
      return results;
    } catch (error) {
      console.log("Error fetching dogs from Next URL:", error);
      throw error;
    }
  }
}
