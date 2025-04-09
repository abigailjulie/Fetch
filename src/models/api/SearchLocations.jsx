export class SearchLocations {
  constructor(url = "https://frontend-take-home-service.fetch.com") {
    this.baseUrl = url;
  }

  async getLocations(zipCode) {
    try {
      const url = `${this.baseUrl}/locations`;

      const body = [zipCode];

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`API response error: ${response.status}`);
      }

      const result = await response.json();
      return result || [];
    } catch (error) {
      console.error("Error finding a location:", error);
      return [];
    }
  }
}
