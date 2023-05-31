import fs from "fs";
import { proxy } from "./config";
import Axios from "axios";

export async function download(url: string, path: string) {
  const writer = fs.createWriteStream(path);
  const response = await Axios.get(url, {
    responseType: "stream",
    proxy,
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}
