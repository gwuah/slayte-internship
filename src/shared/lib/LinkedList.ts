import Node from "./Node";

export default class LinkedList {
  head: Node | null;
  constructor() {
    this.head = null;
  }

  insertAtEnd(data: string): void {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let curr: Node = this.head;
    while (curr.next != null) {
      curr = curr.next;
    }

    curr.next = newNode;
  }
}
