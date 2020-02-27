export default class Node {
  value: string;
  next: Node | null;
  prev: Node | null;
  constructor(value: string) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
