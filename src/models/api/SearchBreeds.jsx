export class SearchBreeds {
  constructor(
    searchQuery = "",
    url = "https://frontend-take-home-service.fetch.com"
  ) {
    this.searchQuery = searchQuery;
    this.url = url;
  }

  async getAllBreedNames() {
    try {
      const response = await fetch(`${this.url}/dogs/breeds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch dogs breeds: ${error}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching breeds: ${error}`);
    }
  }

  filterBreeds(breeds) {
    if (this.searchQuery) {
      return breeds.filter((breed) =>
        breed.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return breeds;
  }

  async SearchBreeds() {
    const breeds = await this.getAllBreedNames();
    return this.filterBreeds(breeds);
  }
}
