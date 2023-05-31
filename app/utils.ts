import fs from "fs";

export function mkDirIfNone(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function sleep(times: number) {
  return new Promise((reolve) => setTimeout(reolve, times));
}
