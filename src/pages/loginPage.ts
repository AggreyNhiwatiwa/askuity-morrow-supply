import { browser } from '@wdio/globals';

class LoginPage {
  async isLoaded() {
    return this.title.waitForDisplayed({
      timeoutMsg: 'The Login Page failed to load',
    });
  }

  async open() {
    await browser.url('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  get title() {
    return $('[data-test="login-title"]');
  }

  get usernameInput() {
    return $('[data-test="username"]');
  }

  get passwordInput() {
    return $('[data-test="password"]');
  }

  get loginButton() {
    return $('[data-test="login-button"]');
  }

  get errorMessageBox() {
    return $('[data-test="login-error-message"]');
  }
}

export default new LoginPage();
