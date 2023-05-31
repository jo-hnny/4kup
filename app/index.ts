import { search } from "./search";
import { parsePage } from "./parsePage";
import { keys, saveDir, size, originSize } from "./config";
import { download } from "./download";
import { mkDirIfNone, sleep } from "./utils";

async function singleTask(key: string) {
  try {
    const pages = await search(key);

    await pages.reduce(async (prePromise, { href, title }) => {
      await prePromise;

      const baseDir = `${saveDir}/${key}/${title}`;

      mkDirIfNone(baseDir);

      const images = await parsePage(href);

      await Promise.all(
        images.map(async (_link) => {
          const link = _link.replace(originSize, size);

          const fileName = link.split("/").pop();

          await download(link, `${baseDir}/${fileName}`);
        })
      );

      console.log(`${title} downloaded!`);
    }, Promise.resolve());

    console.log(`success download ${key} !`);
  } catch (error) {
    console.log(`download ${key} error !`, error);
  }
}

async function start() {
  await keys.reduce(async (preTask, key) => {
    await preTask;

    await singleTask(key);
  }, Promise.resolve());

  console.log("all task is success !");
}

start();
