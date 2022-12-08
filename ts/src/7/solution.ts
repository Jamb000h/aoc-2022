import "../utils";
import { getLines } from "../utils";

export const parseInputForDay = (file: string): any => {
  const lines = getLines(file);
  const fs = { name: "/", dirs: [], items: [], parent: undefined, size: 0 };
  let cur = fs;
  for (const line of lines) {
    if (line.startsWith("$ cd /")) {
      cur = fs;
      continue;
    }

    if (line.startsWith("$ cd ..")) {
      cur = cur.parent ? cur.parent : fs;
      continue;
    }

    if (line.startsWith("$ cd ")) {
      const dirName = line.split("$ cd ")[1];
      const childDir = cur.dirs.find((d) => d.name === dirName);

      if (childDir) {
        cur = childDir;
      } else {
        const newDir = {
          name: dirName,
          dirs: [],
          items: [],
          parent: cur,
          size: 0,
        };
        cur.dirs.push(newDir);
        cur = newDir;
      }
    }

    if (Number(line.charAt(0)) < 10) {
      const [sizeString, name] = line.split(" ");
      const size = Number(sizeString);
      cur.items.push({ name, size });
    }
  }

  calculateSize(fs);
  return fs;
};

export const task1 = (fs: any) => {
  const dirs = getDirs(fs);
  return dirs
    .filter((x) => x.size <= 100000)
    .map((x) => x.size)
    .sum();
};

export const task2 = (fs: any) => {
  const dirs = getDirs(fs);
  const totalSize = fs.size;
  const missingSpace = 30000000 - (70000000 - totalSize);
  return dirs
    .map((x) => x.size)
    .sortAscending()
    .find((x) => x >= missingSpace);
};

const calculateSize = (path: any) => {
  if (path.dirs !== undefined) {
    const size = [...path.dirs, ...path.items].map(calculateSize).sum();
    path.size = size;
  }
  return path.size;
};

const getDirs = (path: any) => {
  if (path.dirs.length === 0) {
    return path;
  }
  return [path].concat(...path.dirs.map(getDirs));
};
