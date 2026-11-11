import { browser } from '@wdio/globals';

class LoginPage {
  //Helpers
  async open() {
    await browser.url('/login');
  }

  async isLoaded() {
    return this.title.waitForDisplayed();
  }

  async login(username: string, password: string) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  //Locators

  //Recommended WDIO text selector strategy for unique text elements on the page
  get title() {
    return $('h1=A good place to begin.');
  }

  //Using accessibility based selector here, as the placeholder text in the Input element is a HTML attribute, not text
  //Despite the Inputs not having an explicitly defined aria-label, it gets computed from the associated label
  get usernameInput() {
    return $('aria/Username');
  }

  get passwordInput() {
    return $('aria/Password');
  }

  get loginButton() {
    return $('button=Login');
  }
}

export default new LoginPage();
