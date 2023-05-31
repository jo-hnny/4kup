import { search } from "./search";
import { parsePage } from "./parsePage";
import { key, saveDir } from "./config";
import { download } from "./download";
import fs from "fs";

async function start() {
  const pages = await search(key);

  await pages.reduce(async (prePromise, { href, title }) => {
    await prePromise;

    const baseDir = `${saveDir}/${key}/${title}`;

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    const images = await parsePage(href);

    await Promise.all(
      images.map(async (link) => {
        const fileName = link.split("/").pop();

        return download(link, `${baseDir}/${fileName}`);
      })
    );

    console.log(`${title} downloaded!`);
  }, Promise.resolve());

  console.log(`success download ${key} !`);
}

start();
