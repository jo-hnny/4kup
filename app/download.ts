import fs from "fs";
import { proxy, enableProxy } from "./config";
import Axios from "axios";

export async function download(url: string, path: string) {
  const writer = fs.createWriteStream(path);
  const response = await Axios.get(url, {
    responseType: "stream",
    proxy: enableProxy && proxy,
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}
