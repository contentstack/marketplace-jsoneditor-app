import { test, expect } from '@playwright/test';
import { jsonEditorApp } from './pages/jsoneditorpage';

test.describe(" Table App at entry", () => {
  let jsoneditorapp;
  test.use({ storageState: "storageState.json" });
  
  test('Should Apply all the Json app tests', async ({page}) => {
    jsoneditorapp = new jsonEditorApp(page);
    await jsoneditorapp.openJsonApp()
    await jsoneditorapp.fillJsonApp()
    await jsoneditorapp.formatJson()
    await jsoneditorapp.compactJson()
    await jsoneditorapp.transformJson()
    await jsoneditorapp.repairJson()
    await jsoneditorapp.undoAction()
    await jsoneditorapp.redoAction()
  });

});