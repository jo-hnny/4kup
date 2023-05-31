import puppeteer from "puppeteer";
import { search } from "./search";
import { parsePage } from "./parsePage";
import { proxy, enableProxy } from "./config";

const key = "leeesovely";

async function start() {
  try {
    const browser = await puppeteer.launch({
      args: enableProxy
        ? [`--proxy-server=${proxy.host}:${proxy.port}`]
        : undefined,
    });

    const entryLinks = await search(browser, key);

    await entryLinks.reduce(async (prePromise, link) => {
      await prePromise;
      return parsePage(browser, link);
    }, Promise.resolve());

    await browser.close();

    console.log("success");
  } catch (error) {
    console.log("error--->", error);
  }
}

start();
