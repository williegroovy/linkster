/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const mockItems = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
  { id: 6, name: '6' },
]


class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue Brute Force
// class PriorityQueue {
//   // An array is used to implement priority
//   constructor() {
//     this.items = [];
//   }
//
//   // functions to be implemented
//   // enqueue(item, priority)
//   // dequeue()
//   // front()
//   // isEmpty()
//   // printPQueue()
//
//   isEmpty() {
//     return this.items.length === 0;
//   }
//
//   enqueue(item, priority) {
//     const element = new QElement(item, priority);
//
//     this.items = [...this.items, element];
//
//     // Sort
//     this.items.sort((itemA, itemB) => itemA.priority - itemB.priority);
//   }
//
//   dequeue() {
//     return this.isEmpty() ? 'Empty' : this.items.shift();
//   }
//
//   front() {
//     return this.isEmpty() ? 'Empty' : this.items[0];
//   }
//
//   rear() {
//     return this.isEmpty() ? 'Empty' : this.items[this.items.length - 1];
//   }
//
//   printPQueue() {
//     return this.items.reduce((accum, curr) => [...accum, curr.element.name], []).join(' ');
//   }
// }

// const pQueue = new PriorityQueue();
//
// pQueue.enqueue(mockItems.shift(), 3);
// pQueue.enqueue(mockItems.shift(), 2);
// pQueue.enqueue(mockItems.shift(), 1);
//
// console.log(pQueue.front());
// console.log(pQueue.isEmpty());
// console.log(pQueue.rear());
// console.log(pQueue.printPQueue());
// console.log(pQueue.dequeue());
//
// console.log(pQueue.printPQueue());

// Priority Queue using Min Binary Heap
class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }

  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  swap(indexOne, indexTwo) {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = temp;
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  remove() {
    if (this.heap.length === 0) {
      return null;
    }

    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return item;
  }

  add(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.parent(index).priority > this.heap[index].priority) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.rightChild(index).priority < this.leftChild(index).priority) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index].priority < this.heap[smallerChildIndex].priority) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}

let PriQueue = new PriorityQueue();

// Adding the Elements
PriQueue.add(32);
PriQueue.add(45);
PriQueue.add(12);
PriQueue.add(65);
PriQueue.add(85);


console.log(PriQueue.peek());
console.log(PriQueue.remove());
console.log(PriQueue.peek());
console.log(PriQueue.remove());
console.log(PriQueue.peek());
console.log(PriQueue.remove());
