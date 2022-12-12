import { generateEmptyVisited, getLines, neighbors2D } from "../utils";

interface Coords {
  y: number;
  x: number;
}

interface Task {
  grid: number[][];
  startCoords: Coords;
  endCoords: Coords;
}

export const parseInputForDay = (file: string) => {
  let startCoords: Coords = undefined;
  let endCoords: Coords = undefined;
  const grid = getLines(file).map((line, y) => {
    return line.split("").map((c, x) => {
      if (c === "S") {
        startCoords = { y, x };
        return -1;
      }

      if (c === "E") {
        endCoords = { y, x };
        return 26;
      }

      return c.charCodeAt(0) - 97;
    });
  });

  return {
    grid,
    startCoords,
    endCoords,
  };
};

export const task1 = ({ grid, startCoords, endCoords }: Task) => {
  const visited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false)
  );
  const stack = new PriorityQueue<Coords>();

  stack.push(startCoords, 0);

  while (!stack.isEmpty()) {
    const { item, priority } = stack.pop();
    const { y, x } = item;
    const value = grid[y][x];

    if (visited[y][x]) {
      continue;
    }

    visited[y][x] = true;

    if (y == endCoords.y && x == endCoords.x) {
      return priority;
    }

    neighbors2D(y, x, grid, false).forEach(([nY, nX]) => {
      if (visited[nY][nX]) {
        return false;
      }
      const nValue = grid[nY][nX];
      if (nValue - value > 1) {
        return false;
      }
      stack.push({ y: nY, x: nX }, priority + 1);
    });
  }

  return 0;
};

export const task2 = ({ grid, startCoords, endCoords }: Task) => {
  const visited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false)
  );
  const stack = new PriorityQueue<Coords>();

  stack.push(endCoords, 0);

  while (!stack.isEmpty()) {
    const { item, priority } = stack.pop();
    const { y, x } = item;
    const value = grid[y][x];

    if (visited[y][x]) {
      continue;
    }

    visited[y][x] = true;

    if (value === 0) {
      return priority;
    }

    neighbors2D(y, x, grid, false).forEach(([nY, nX]) => {
      if (visited[nY][nX]) {
        return false;
      }
      const nValue = grid[nY][nX];
      if (value - nValue > 1) {
        return false;
      }
      stack.push({ y: nY, x: nX }, priority + 1);
    });
  }

  return 0;
};

// This is from my other project

interface PQNode<T> {
  item: T;
  priority: number;
}

class PriorityQueue<T> {
  private values: PQNode<T>[];

  /**
   * Creates a new minimum priority queue. Smallest priority on top.
   */
  constructor() {
    this.values = [];
  }

  /**
   * Adds a node to queue
   * @param priority priority
   */
  push(item: T, priority: number) {
    this.values.push({ item, priority });

    // Move up in the queue until correctly positioned
    this.moveUp();
  }

  /**
   * Returns the smallest node in the queue
   * @return {object} the smallest node in the queue
   */
  pop(): PQNode<T> {
    const smallestNode = { ...this.values[0] };
    const largestIndex = this.values.length - 1;

    // Swap smallest node (index 0) and largest node
    this.swap(0, largestIndex);

    // Remove smallest node
    this.values.pop();

    // Move largest node to correct position
    this.moveDown();

    return smallestNode;
  }

  /**
   * Moves the last value of the queue until it is in correct position
   */
  private moveUp() {
    let index = this.values.length - 1;
    // As long as current node is has a smaller priority than the parent, swap with parent
    // and stop if the current node becomes the first one
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.values[parentIndex];
      const current = this.values[index];

      // We want to swap if parent has a larger priority
      if (parent.priority > current.priority) {
        this.values[parentIndex] = current;
        this.values[index] = parent;
        index = parentIndex;
      } else break;
    }
  }

  /**
   * Moves the first node of the queue until it is in correct position
   */
  private moveDown() {
    // Start at the first value
    let currentIndex = 0;
    let smallestIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;

      if (
        leftChildIndex < this.values.length &&
        this.values[leftChildIndex].priority <
          this.values[smallestIndex].priority
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.values.length &&
        this.values[rightChildIndex].priority <
          this.values[smallestIndex].priority
      ) {
        smallestIndex = rightChildIndex;
      }

      if (currentIndex !== smallestIndex) {
        // If we found a new smaller value, swap values
        this.swap(currentIndex, smallestIndex);
        currentIndex = smallestIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Swaps values in two nodes
   * @param i index of value 1
   * @param j index of value 2
   */
  private swap(i: number, j: number) {
    const temp = { ...this.values[i] };
    this.values[i] = { ...this.values[j] };
    this.values[j] = { ...temp };
  }

  /**
   * Return information whether the queue is empty
   * @return {boolean} true if empty, false otherwise
   */
  isEmpty(): boolean {
    return this.values.length === 0;
  }

  /**
   * Get all values of the queue
   * @return {PQNode[]} Array of PQNodes
   */
  getValues(): PQNode<T>[] {
    return this.values;
  }
}
