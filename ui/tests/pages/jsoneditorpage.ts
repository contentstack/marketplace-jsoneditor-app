import { Locator, Page, Frame, expect } from '@playwright/test';
import { elements } from '../elements/jsoneditor.elements';

export class jsonEditorApp {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateEntryPage() {
    await this.page
      .goto(`${process.env.ENV_URL}/#!/stack/${process.env.STACK_UID}/content-type/test_json_editor/en-us/entry/create`);
  }

  async validateJsonApp() {
    const appFrameLocator = await this.page.frameLocator('[data-testid="app-extension-frame"]')
    await appFrameLocator.locator('div').filter({ hasText: /^\{\}$/ }).nth(1).click();
    await expect(appFrameLocator.locator('div').filter({ hasText: /^\{\}$/ }).nth(1)).toBeVisible();
  }

};