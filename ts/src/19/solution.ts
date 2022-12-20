import "../utils";
import { getLines } from "../utils";

interface Blueprint {
  id: number;
  ore: {
    ore: number;
    clay: number;
    obsidian: number;
  };
  clay: {
    ore: number;
    clay: number;
    obsidian: number;
  };
  obsidian: {
    ore: number;
    clay: number;
    obsidian: number;
  };
  geode: {
    ore: number;
    clay: number;
    obsidian: number;
  };
}
// Blueprint 30: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 4 ore and 18 obsidian.
export const parseInputForDay = (file: string): Blueprint[] => {
  return getLines(file).map((line) => {
    const [idPart, afterIdPart] = line.split(": ");
    const [oreRobotPart, clayRobotPart, obsidianRobotPart, geodeRobotPart] =
      afterIdPart.split(". ");
    const id = Number(idPart.split(" ")[1]);
    const oreRobotOreCost = Number(oreRobotPart.split(" ")[4]);
    const clayRobotOreCost = Number(clayRobotPart.split(" ")[4]);
    const obsidianRobotOreCost = Number(obsidianRobotPart.split(" ")[4]);
    const obsidianRobotClayCost = Number(obsidianRobotPart.split(" ")[7]);
    const geodeRobotOreCost = Number(geodeRobotPart.split(" ")[4]);
    const geodeRobotObsidianCost = Number(geodeRobotPart.split(" ")[7]);

    return {
      id,
      ore: {
        ore: oreRobotOreCost,
        clay: 0,
        obsidian: 0,
      },
      clay: {
        ore: clayRobotOreCost,
        clay: 0,
        obsidian: 0,
      },
      obsidian: {
        ore: obsidianRobotOreCost,
        clay: obsidianRobotClayCost,
        obsidian: 0,
      },
      geode: {
        ore: geodeRobotOreCost,
        clay: 0,
        obsidian: geodeRobotObsidianCost,
      },
    };
  });
};

export const task1 = (blueprints: Blueprint[]) => {
  const values = blueprints.map((blueprint) => {
    const resources = {
      ore: 0,
      clay: 0,
      obsidian: 0,
      geode: 0,
    };
    const robots = {
      ore: 1,
      clay: 0,
      obsidian: 0,
      geode: 0,
    };

    const result =
      buildRobots(blueprint, resources, robots, undefined, 1, 0, 24) *
      blueprint.id;
    return result;
  });

  return values.sum();
};

export const task2 = (blueprints: Blueprint[]) => {
  const values = blueprints.take(3).map((blueprint) => {
    const resources = {
      ore: 0,
      clay: 0,
      obsidian: 0,
      geode: 0,
    };
    const robots = {
      ore: 1,
      clay: 0,
      obsidian: 0,
      geode: 0,
    };

    const result = buildRobots(
      blueprint,
      resources,
      robots,
      undefined,
      1,
      0,
      32
    );
    return result;
  });

  return values.product();
};

const canBuildRobot = (robotCost, resources) => {
  return (
    robotCost.ore <= resources.ore &&
    robotCost.clay <= resources.clay &&
    robotCost.obsidian <= resources.obsidian
  );
};

const optimisticMaxGeodesToBeMined = (
  geodeRobots: number,
  minute: number,
  maxMinute: number
) => {
  let geodes = 0;
  for (let i = minute; i <= maxMinute; i++) {
    geodes += geodeRobots;
    geodeRobots += 1;
  }

  return geodes;
};

const buildRobots = (
  blueprint,
  resources,
  robots,
  targetRobot,
  minute,
  currentBest,
  maxMinute
) => {
  if (minute > maxMinute) {
    return resources.geode;
  }

  const bestWeCanDoAnymore =
    resources.geode +
    optimisticMaxGeodesToBeMined(robots.geode, minute, maxMinute);

  // Yeah, this is worse than something else
  if (bestWeCanDoAnymore < currentBest) return currentBest;

  if (targetRobot === "geode") {
    if (canBuildRobot(blueprint.geode, resources)) {
      const result = buildRobots(
        blueprint,
        {
          ore: resources.ore - blueprint.geode.ore + robots.ore,
          clay: resources.clay - blueprint.geode.clay + robots.clay,
          obsidian:
            resources.obsidian - blueprint.geode.obsidian + robots.obsidian,
          geode: resources.geode + robots.geode,
        },
        { ...robots, geode: robots.geode + 1 },
        undefined,
        minute + 1,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    } else {
      const result = buildRobots(
        blueprint,
        {
          ore: resources.ore + robots.ore,
          clay: resources.clay + robots.clay,
          obsidian: resources.obsidian + robots.obsidian,
          geode: resources.geode + robots.geode,
        },
        { ...robots },
        "geode",
        minute + 1,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    }

    return currentBest;
  }

  if (targetRobot === "obsidian") {
    if (canBuildRobot(blueprint.obsidian, resources)) {
      const result = buildRobots(
        blueprint,
        {
          ore: resources.ore - blueprint.obsidian.ore + robots.ore,
          clay: resources.clay - blueprint.obsidian.clay + robots.clay,
          obsidian:
            resources.obsidian - blueprint.obsidian.obsidian + robots.obsidian,
          geode: resources.geode + robots.geode,
        },
        { ...robots, obsidian: robots.obsidian + 1 },
        undefined,
        minute + 1,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    } else {
      const result = buildRobots(
        blueprint,
        {
          ore: resources.ore + robots.ore,
          clay: resources.clay + robots.clay,
          obsidian: resources.obsidian + robots.obsidian,
          geode: resources.geode + robots.geode,
        },
        { ...robots },
        "obsidian",
        minute + 1,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    }

    return currentBest;
  }

  if (targetRobot === "clay") {
    if (canBuildRobot(blueprint.clay, resources)) {
      const result = buildRobots(
        blueprint,
        {
          ore: resources.ore - blueprint.clay.ore + robots.ore,
          clay: resources.clay - blueprint.clay.clay + robots.clay,
          obsidian:
            resources.obsidian - blueprint.clay.obsidian + robots.obsidian,
          geode: resources.geode + robots.geode,
        },
        { ...robots, clay: robots.clay + 1 },
        undefined,
        minute + 1,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    } else {
      const result = buildRobots(
        blueprint,
        {
          ore: resources.ore + robots.ore,
          clay: resources.clay + robots.clay,
          obsidian: resources.obsidian + robots.obsidian,
          geode: resources.geode + robots.geode,
        },
        { ...robots },
        "clay",
        minute + 1,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    }

    return currentBest;
  }

  if (targetRobot === "ore") {
    if (canBuildRobot(blueprint.ore, resources)) {
      const result = buildRobots(
        blueprint,
        {
          ore: resources.ore - blueprint.ore.ore + robots.ore,
          clay: resources.clay - blueprint.ore.clay + robots.clay,
          obsidian:
            resources.obsidian - blueprint.ore.obsidian + robots.obsidian,
          geode: resources.geode + robots.geode,
        },
        { ...robots, ore: robots.ore + 1 },
        undefined,
        minute + 1,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    } else {
      const result = buildRobots(
        blueprint,
        {
          ore: resources.ore + robots.ore,
          clay: resources.clay + robots.clay,
          obsidian: resources.obsidian + robots.obsidian,
          geode: resources.geode + robots.geode,
        },
        { ...robots },
        "ore",
        minute + 1,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    }
  }

  if (targetRobot === undefined) {
    let result = undefined;
    result = buildRobots(
      blueprint,
      { ...resources },
      { ...robots },
      "geode",
      minute,
      currentBest,
      maxMinute
    );

    if (result > currentBest) {
      currentBest = result;
    }

    if (robots.obsidian < blueprint.geode.obsidian) {
      result = buildRobots(
        blueprint,
        { ...resources },
        { ...robots },
        "obsidian",
        minute,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    }
    if (robots.clay < blueprint.obsidian.clay) {
      result = buildRobots(
        blueprint,
        { ...resources },
        { ...robots },
        "clay",
        minute,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    }
    if (
      robots.ore <
      Math.max(
        blueprint.geode.ore,
        blueprint.obsidian.ore,
        blueprint.clay.ore,
        blueprint.ore.ore
      )
    ) {
      result = buildRobots(
        blueprint,
        { ...resources },
        { ...robots },
        "ore",
        minute,
        currentBest,
        maxMinute
      );

      if (result > currentBest) {
        currentBest = result;
      }
    }
  }

  return currentBest;
};
