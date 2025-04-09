export class DogResults {
  constructor({ resultIds, total, next, prev }) {
    this.resultIds = resultIds;
    this.total = total;
    this.next = next;
    this.prev = prev;
  }
}
