import { Browser } from "puppeteer";

const baseUrl = "https://www.4kup.net";

export async function search(browser: Browser, key: string) {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/search?q=${key}`, { waitUntil: "networkidle2" });

  const entryList = await page.$$("#postfeed .entry-title a");

  const entryLinks = await Promise.all(
    entryList.map(async (a) => {
      const href = await a.getProperty("href");
      return href.jsonValue();
    })
  );

  await page.close();

  return entryLinks;
}
