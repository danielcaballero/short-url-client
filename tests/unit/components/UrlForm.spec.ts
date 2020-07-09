import { shallowMount } from "@vue/test-utils";
import UrlForm from "@/components/UrlForm.vue";
import UrlService from "@/services/UrlService";
import { fakeInvalidUrl, fakeValidUrl } from "@tests/shared";

jest.mock("@/services/UrlService");
const wrapper = shallowMount(UrlForm);

describe("UrlForm.vue", () => {
  beforeEach(async () => {
    await wrapper.setData({ url: "" });
  });

  it("should contain label", () => {
    expect(wrapper.find("label").text()).toMatch("Paste your long URL here");
  });

  it("should contain button", () => {
    expect(wrapper.find("button").text()).toMatch("Shorten URL");
  });

  describe("with valid URL", () => {
    beforeEach(async () => {
      await wrapper.setData({ url: fakeInvalidUrl });
    });
    it("should disable button for invalid URL", () => {
      expect(wrapper.find("button").attributes().disabled).toBeTruthy();
    });

    it("should not emit event when clicking button with invalid URL", async () => {
      await wrapper.find("button").trigger("click");

      expect(wrapper.emitted()["fetch-urls"]).toBeFalsy();
    });

    it("should not call service to create URL when clicking button", async () => {
      await wrapper.find("button").trigger("click");
      const urlServiceInstance: UrlService = (UrlService as jest.Mock).mock
        .instances[0];

      expect(urlServiceInstance.createShortUrl).not.toHaveBeenCalled();
    });
  });

  describe("with valid URL", () => {
    beforeEach(async () => {
      await wrapper.setData({ url: fakeValidUrl });
    });

    it("should have enabled button", async () => {
      expect(wrapper.find("button").attributes().disabled).toBeFalsy();
    });

    it("should emit event when clicking button", async () => {
      await wrapper.find("button").trigger("click");

      expect(wrapper.emitted()["fetch-urls"]).toBeTruthy();
    });

    it("should call service to create URL when clicking button", async () => {
      await wrapper.find("button").trigger("click");
      const urlServiceInstance: UrlService = (UrlService as jest.Mock).mock
        .instances[0];

      expect(urlServiceInstance.createShortUrl).toHaveBeenCalledWith(
        fakeValidUrl
      );
    });
  });
});
