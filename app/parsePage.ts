import { axios } from "./request";
import * as cheerio from "cheerio";

export async function parsePage(url: string) {
  const rsp = await axios.get(url);

  const c = cheerio.load(rsp?.data);

  const post = c("#post-body #invisblecontent").text();

  const $ = cheerio.load(post);

  const images = $("#gallery img")
    .map((_, img) => img.attribs.src)
    .get();

  return images;
}
