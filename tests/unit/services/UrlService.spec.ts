import axios from "axios";
import { mocked } from "ts-jest/utils";

import UrlService from "@/services/UrlService";
import { fakeValidUrl, fakeShortUrls } from "@tests/shared";

jest.mock("axios");
const axiosMock = mocked(axios, true);

const service = new UrlService();

describe("UrlService", () => {
  it("should call POST /api/urls endpoint", async () => {
    axiosMock.post.mockImplementationOnce(async () => ({
      data: fakeShortUrls[0],
    }));
    const result = await service.createShortUrl(fakeValidUrl);

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith("/api/urls", {
      url: fakeValidUrl,
    });
    expect(result).toBeUndefined();
  });

  it("should call GET /api/urls endpoint", async () => {
    axiosMock.get.mockImplementationOnce(async () => ({
      data: fakeShortUrls,
    }));
    const result = await service.fetchShortUrls();

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith("/api/urls");
    expect(result).toEqual(fakeShortUrls);
  });
});
