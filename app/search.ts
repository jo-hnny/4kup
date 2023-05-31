import { axios } from "./request";

export async function search(
  key: string
): Promise<{ href: string; title: string }[]> {
  const url = `http://www.4kup.net/feeds/posts/summary?q=${key}&start-index=1&max-results=100&orderby=published&alt=json`;

  const rsp = await axios.get(url);

  const pages = rsp?.data?.feed?.entry?.map((item: any) => {
    const href = item?.link?.find((l: any) => l.rel === "alternate")?.href;

    const title = item?.title?.$t;

    return {
      href,
      title,
    };
  });

  return pages;
}
