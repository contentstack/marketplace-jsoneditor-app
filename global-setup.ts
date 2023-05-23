import { chromium, FullConfig } from '@playwright/test';
import { AppLogin } from './tests/login';
import { getAuthToken } from './tests/pre-initialization';

const globalSetup = async () => {

  const {CONTENTSTACK_LOGIN, CONTENTSTACK_PASSWORD , BASIC_AUTH_PASSWORD , BASIC_AUTH_USERNAME} = process.env;

  const userstackEmail = CONTENTSTACK_LOGIN;
  const userstackPassword = CONTENTSTACK_PASSWORD;

  const browser = await chromium.launch();
  const stagLogin = await browser.newPage({
    httpCredentials: {
      username: BASIC_AUTH_USERNAME || '',
      password: BASIC_AUTH_PASSWORD || '',
    },
  });
  const loginSetup = new AppLogin(stagLogin);
  await loginSetup.getLoginPage();
  await loginSetup.contentstackLogin(userstackEmail, userstackPassword);
  await getAuthToken();
};

export default globalSetup;
