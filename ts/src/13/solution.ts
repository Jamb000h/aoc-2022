import "../utils";

export const parseInputForDay = (file: string) =>
  file.split("\r\n\r\n").map((packetPair) => {
    return packetPair.split("\r\n").map((packet) => JSON.parse(packet));
  });

export const task1 = (packetPairs: unknown[][]) => {
  return packetPairs
    .map((packetPair, i) => {
      const [left, right] = packetPair;

      return comparePackets(left, right) ? i + 1 : 0;
    })
    .sum();
};

export const task2 = (packetPairs: unknown[][]) => {
  const packetsList = packetPairs.flat();
  packetsList.push([[2]]);
  packetsList.push([[6]]);
  packetsList.sort((a, b) => (comparePackets(a, b) ? -1 : 1));
  let indices = [];

  packetsList.forEach((packet, i) => {
    if (Array.isArray(packet)) {
      if (packet.length === 1 && packet[0].length === 1) {
        if (packet[0][0] === 2 || packet[0][0] === 6) {
          indices.push(i + 1);
        }
      }
    }
  });

  return indices.product();
};

const comparePackets = (left: unknown, right: unknown): boolean => {
  // Right list is out of items first
  if (right === undefined) {
    return false;
  }
  // Compare arrays
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length; i++) {
      const isInOrder = comparePackets(left[i], right[i]);

      if (isInOrder !== undefined) return isInOrder;
    }

    // Same length, equal items
    if (left.length === right.length) {
      return undefined;
    }

    // Otherwise one array is smaller
    return left.length < right.length;
  }

  // Compare array + integer
  if (Array.isArray(left) && !Array.isArray(right)) {
    return comparePackets(left, [right]);
  }

  // Compare integer + array
  if (!Array.isArray(left) && Array.isArray(right)) {
    return comparePackets([left], right);
  }

  // Compare integers
  if (Number(left) === Number(right)) {
    // Equal value does not determine order
    return undefined;
  }

  return Number(left) < Number(right);
};
