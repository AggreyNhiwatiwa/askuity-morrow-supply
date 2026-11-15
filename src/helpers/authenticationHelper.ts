import loginPage from '../pages/loginPage';

//Login implemented in loginPage POM, this is just for credentials etc

export async function loginAsStandardUser() {
  const username = process.env.SHOPPER_USERNAME;
  const password = process.env.PASSWORD;

  if (!username || !password) {
    throw new Error('Standard user credentials are missing');
  }

  await loginPage.open();
  await loginPage.login(username, password);
}
