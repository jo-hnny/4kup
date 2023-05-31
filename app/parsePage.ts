import { Browser } from "puppeteer";
import fs from "fs";
import { download } from "./download";

const baseDir = "./images";

export async function parsePage(browser: Browser, link: string) {
  const albumName = link.split("/").pop()?.replace(".html", "");

  const albumDir = `${baseDir}/${albumName}`;
  if (!fs.existsSync(albumDir)) {
    fs.mkdirSync(albumDir, { recursive: true });
  }

  const page = await browser.newPage();

  await page.goto(link, { waitUntil: "networkidle2" });

  const imgs = await page.$$(".thumb-photo img");

  const imgLInks = await Promise.all(
    imgs.map(async (item) => {
      const jsHandle = await item.getProperty("src");

      return jsHandle.jsonValue();
    })
  );

  await page.close();

  await Promise.all(
    imgLInks.map((link) => {
      const fileName = link.split("/").pop();

      return download(link, `${albumDir}/${fileName}`);
    })
  );

  console.log(`${albumName} is downloaded`);
}
