export class FindMatch {
  constructor(url = "https://frontend-take-home-service.fetch.com") {
    this.baseUrl = url;
  }

  async getMatch(favorites) {
    try {
      const url = `${this.baseUrl}/dogs/match`;

      const body = favorites;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error finding a match:", error);
      return null;
    }
  }
}
