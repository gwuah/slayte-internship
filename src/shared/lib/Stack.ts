export default class Stack {
  queue: string[] = [];
  constructor() {
    this.queue = [];
  }

  push(data: string): void {
    this.queue.push(data);
  }

  pop(): string | undefined {
    return this.queue.pop();
  }
}
