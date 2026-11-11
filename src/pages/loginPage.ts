import { browser } from '@wdio/globals';

class LoginPage {
  //Helpers
  async open() {
    await browser.url('/login');
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
  //Targets label, role selectors are case sensitive
  get usernameInput() {
    return $('role/textbox[name="Username"]');
  }

  get passwordInput() {
    return $('role/textbox[name="Password"]');
  }

  get loginButton() {
    return $('button=Login');
  }
}

export default new LoginPage();
