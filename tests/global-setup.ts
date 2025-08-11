// global-setup.ts
import { chromium } from "@playwright/test";
import { LoginPage } from "./login";
import { getAuthToken } from "./utils/prehelpers";

async function globalSetup() {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage({
      httpCredentials: {
        username: process.env.BASIC_AUTH_USERNAME || "",
        password: process.env.BASIC_AUTH_PASSWORD || "",
      },
    });
    const loginPage = new LoginPage(page);
    await loginPage.visitLoginPage();
    await loginPage.performLogin(process.env.EMAIL || "", process.env.PASSWORD || "");
    await getAuthToken();
  } catch (error) {
    console.error("Error in globalSetup", error);
    throw error;
  }
}

export default globalSetup;