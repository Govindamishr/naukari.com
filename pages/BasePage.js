export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    await this.page.goto(url);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async type(selector, text) {
    await this.page.fill(selector, text);
  }

  async wait(seconds) {
    await this.page.waitForTimeout(seconds * 1000);
  }
}
