import { ShortUrl } from "@/services/UrlService";

export const fakeValidUrl = "http://www.google.com";

export const fakeInvalidUrl = "htp:/www.google.com";

export const fakeShortUrls: ShortUrl[] = [
  "http://www.google.com",
  "http://www.amazon.com",
].map((url, i) => ({
  url,
  shortUrl: `http://fake${i}.com`,
  createdAt: new Date(),
}));
