import Axios from "axios";
import { proxy, enableProxy } from "./config";

export const axios = Axios.create({
  proxy: enableProxy && proxy,

  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
  },
});
