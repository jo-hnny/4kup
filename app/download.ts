import fs from "fs";
import { proxy, enableProxy } from "./config";
import { axios } from "./request";

export async function download(url: string, path: string) {
  try {
    const writer = fs.createWriteStream(path);
    const response = await axios.get(url, {
      responseType: "stream",
      proxy: enableProxy && proxy,
    });

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.log("download fail:", url);
  }
}
