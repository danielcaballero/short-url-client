import axios, { AxiosError } from "axios";

export type ShortUrl = {
  url: string;
  shortUrl: string;
  createdAt: Date;
};

export default class UrlService {
  async createShortUrl(url: string): Promise<void> {
    try {
      await axios.post("/api/urls", { url });
    } catch (err) {
      const message = (err as AxiosError).message;
      console.error(`Error creating short URL:`, message);
      return;
    }
  }

  async fetchShortUrls(): Promise<ShortUrl[]> {
    try {
      const { data }: { data: ShortUrl[] } = await axios.get("/api/urls");
      return data;
    } catch (err) {
      const message = (err as AxiosError).message;
      console.error(`Error loading URLs:`, message);
      return [];
    }
  }
}
