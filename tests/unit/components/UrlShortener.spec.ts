import { shallowMount, Wrapper } from "@vue/test-utils";

import UrlService from "@/services/UrlService";
import UrlShortener from "@/components/UrlShortener.vue";
import UrlForm from "@/components/UrlForm.vue";
import { fakeShortUrls } from "@tests/shared";

jest.mock("@/services/UrlService");

const mockFetchShortUrls = jest.fn(() => Promise.resolve(fakeShortUrls));

(UrlService as jest.Mock).mockImplementation(() => {
  return {
    fetchShortUrls: mockFetchShortUrls,
  };
});

// this is to avoid casting to 'any' in the expectations that read `wrapper.vm`
// as per https://github.com/vuejs/vue-test-utils/issues/255#issuecomment-628628682
const wrapper: Wrapper<UrlShortener & { [key: string]: any }> = shallowMount(
  UrlShortener
);

describe("UrlShortener.vue", () => {
  it("should call service to initialize url items", () => {
    expect(wrapper.vm.items).toEqual(fakeShortUrls);
    expect(wrapper.vm.loaded).toBeTruthy();
  });

  it("should display form and list when loaded", () => {
    const html = wrapper.html();
    expect(html).toMatch("urlform");
    expect(html).toMatch("urllist");
  });

  it("should call service to re-fetch url when custom event is triggered", async () => {
    expect(mockFetchShortUrls).toHaveBeenCalledTimes(1);
    wrapper.findComponent(UrlForm).vm.$emit("fetch-urls");
    await wrapper.vm.$nextTick();
    expect(mockFetchShortUrls).toHaveBeenCalledTimes(2);
  });

  it("should display only form when not loaded", async () => {
    expect(wrapper.setData({ loaded: false })).toBeDefined();
    await wrapper.vm.$nextTick();
    const html = wrapper.html();
    expect(html).toMatch("urlform");
    expect(html).not.toMatch("urllist");
  });
});
