export class FilterLocations {
  constructor(url = "https://frontend-take-home-service.fetch.com") {
    this.baseUrl = url;
  }

  async getFilteredLocations({ city, state, from, size }) {
    try {
      const url = `${this.baseUrl}/locations/search`;

      const body = {
        city: city,
        state: state,
        from,
        size,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error finding a searched location:", error);
      return [];
    }
  }
}
