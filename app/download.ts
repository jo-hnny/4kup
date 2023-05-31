import { promises as fs } from "fs";

export async function download(url: string, path: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.writeFile(path, buffer);
}
