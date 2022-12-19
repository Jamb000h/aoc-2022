import "../utils";
import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file.trim()).reduce((prev, cur) => {
    const [start, targetCaves] = cur.split(/\sto\s\w+\s/);
    const startParts = start.split(" ");
    return [
      ...prev,
      {
        key: startParts[1],
        paths: targetCaves.split(", "),
        flowRate: Number(startParts[4].split("=")[1].split(";")[0]),
        open: false,
      },
    ];
  }, []);
};

export const task1 = (input: any) => {
  const allPairDistances = floydWarshall(input);
  const combined = input
    // Ignore caves that don't provide flow except AA
    .filter((i) => i.flowRate > 0 || i.key === "AA")
    .map((i) => {
      return {
        ...i,
        paths: allPairDistances[i.key],
      };
    });
  // Get all paths traversable in 30 minutes
  // RIP spatial complexity
  const results = traverseVolcano(combined, "AA", [], 1, 0, 0, 0, false).map(
    (result) => result.flow
  );
  results.sortAscending();
  return results.pop();
};

export const task2 = (input: any) => {
  const allPairDistances = floydWarshall(input);
  const combined = input
    // Ignore caves that don't provide flow except AA
    .filter((i) => i.flowRate > 0 || i.key === "AA")
    .map((i) => {
      return {
        ...i,
        paths: allPairDistances[i.key],
      };
    });

  // Get all paths traversable in 26 minutes and sort descending
  const results: any[] = traverseVolcano(combined, "AA", [], 1, 0, 0, 0, true);
  results.sort((a, b) => b.flow - a.flow);
  const top1000Results = results.take(1000);

  // Find two separate routes with highest flow
  for (const result1 of top1000Results) {
    for (const result2 of top1000Results) {
      if (result1.path.every((cave1) => !result2.path.includes(cave1))) {
        return result1.flow + result2.flow;
      }
    }
  }

  return -1;
};

const traverseVolcano = (
  caves: any,
  current: string,
  path: string[],
  minute: number,
  flowTotal: number,
  travelTime: number,
  actor: number,
  part2: boolean
) => {
  const currentCave = caves.find((i) => i.key === current);
  // Flow per minute based on all valves opened before this minute
  const flowPerMinute = Object.values(caves)
    .filter((x: any) => x.open)
    .map((x: any) => x.flowRate)
    .sum();

  // Eruption imminent, let's hope this is enough
  if ((!part2 && minute === 30) || (part2 && minute === 26)) {
    currentCave.open = false;
    return { path, flow: flowTotal + flowPerMinute };
  }

  // We are still moving somewhere
  if (travelTime > 0) {
    return traverseVolcano(
      caves,
      current,
      path,
      minute + 1,
      flowTotal + flowPerMinute,
      travelTime - 1,
      actor,
      part2
    );
  }

  // We are in the target cave, but we have to open the valve now
  if (!currentCave.open && currentCave.key !== "AA") {
    currentCave.open = true;
    return traverseVolcano(
      caves,
      current,
      [...path, current],
      minute + 1,
      flowTotal + flowPerMinute,
      0,
      actor,
      part2
    );
  }

  // Valve is open, let's move somewhere else that is
  // 1) reachable and 2) with a closed valve
  const neighbors = caves.filter(
    (cave) =>
      !cave.open &&
      currentCave.paths[cave.key] !== Infinity &&
      cave.flowRate > 0
  );

  // We have nowhere to move, let's wait as long as we can
  if (neighbors.length === 0) {
    return traverseVolcano(
      caves,
      current,
      path,
      minute + 1,
      flowTotal + flowPerMinute,
      0,
      actor,
      part2
    );
  }

  // We have somewhere to move, let's try all of them!
  const results = neighbors.map((cave) => {
    return traverseVolcano(
      caves,
      cave.key,
      path,
      minute,
      flowTotal,
      currentCave.paths[cave.key],
      actor,
      part2
    );
  });

  // This may not have been the best cave to reach right now, so let's
  // close this valve to ensure other routes get correct results
  currentCave.open = false;

  return results.flat();
};

const floydWarshall = (input: any) => {
  let dist = {};
  // Initialize
  for (const currentCave of input) {
    dist[currentCave.key] = {};
    input.forEach((cave: any) => (dist[currentCave.key][cave.key] = Infinity));
    currentCave.paths.forEach((path) => (dist[currentCave.key][path] = 1));
    dist[currentCave.key][currentCave.key] = 0;
  }
  // Calculate
  for (const cave1 of input) {
    for (const cave2 of input) {
      for (const cave3 of input) {
        if (
          dist[cave2.key][cave3.key] >
          dist[cave1.key][cave2.key] + dist[cave1.key][cave3.key]
        )
          dist[cave2.key][cave3.key] =
            dist[cave1.key][cave2.key] + dist[cave1.key][cave3.key];
      }
    }
  }

  return dist;
};
