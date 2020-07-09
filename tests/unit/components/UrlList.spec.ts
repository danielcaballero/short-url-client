import { shallowMount } from "@vue/test-utils";
import UrlList from "@/components/UrlList.vue";
import { fakeShortUrls } from "@tests/shared";

const wrapper = shallowMount(UrlList);

describe("UrlShortener.vue", () => {
  it("should display table when there are more than zero items", async () => {
    wrapper.setProps({ items: fakeShortUrls });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain("URL");
    expect(wrapper.text()).toContain("Created at");
    expect(wrapper.text()).toContain("Short URL");
    fakeShortUrls.forEach((url) => {
      expect(wrapper.text()).toContain(url.createdAt.toLocaleString());
      expect(wrapper.text()).toContain(url.shortUrl);
      expect(wrapper.text()).toContain(url.url);
    });
  });

  it("should not display table when there are zero or less items", async () => {
    wrapper.setProps({ items: [] });
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).not.toContain("URL");
    expect(wrapper.text()).not.toContain("Created at");
    expect(wrapper.text()).not.toContain("Short URL");
    fakeShortUrls.forEach((url) => {
      expect(wrapper.text()).not.toContain(url.createdAt.toLocaleString());
      expect(wrapper.text()).not.toContain(url.shortUrl);
      expect(wrapper.text()).not.toContain(url.url);
    });
  });
});
