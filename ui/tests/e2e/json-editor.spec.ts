import { test } from '@playwright/test';
import { jsonEditorApp } from '../pages/jsoneditorpage';

test.describe(" Json editor App at entry", () => {
  let app;
  
  test('Should Apply all the Json app tests', async ({page}) => {
    // TODO: Fix the linting errors
    // eslint-disable-next-line new-cap
    app = new jsonEditorApp(page);
    await app.navigateEntryPage()
    await app.validateJsonApp()
  });

});