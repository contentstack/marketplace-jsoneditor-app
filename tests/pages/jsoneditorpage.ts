import { Locator, Page, Frame } from '@playwright/test';
import { elements } from '../elements/jsoneditor.elements';

export class jsonEditorApp {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openJsonApp() {
    await this.page
    .goto(`${process.env.APP_BASE_URL}/#!/stack/${process.env.STACK_UID}/content-type/test_json_editor/en-us/entry/create`);
  
  }

  async fillJsonApp(){
    await this.page
      .frameLocator(elements.FrameLocator)
      .locator('div')
      .filter({ hasText: /^\{date : today\}$/ })
      .nth(1)
      .click();
  }

  async formatJson(){
    await this.page
      .frameLocator(elements.FrameLocator)
      .getByRole('button', { name: elements.formatJsonName })
      .click();
  }
  
  async compactJson(){
    await this.page
      .frameLocator(elements.FrameLocator)
      .getByRole('button', { name: elements.compactJsonName })
      .click();
  }

  async transformJson(){
    await this.page
      .frameLocator(elements.FrameLocator)
      .getByRole('button', { name: elements.transformJsonName})
      .click();
  }
 
  async repairJson(){
    await this.page
      .frameLocator(elements.FrameLocator)
      .getByRole('button', { name: elements.repairJsonName })
      .click();
  }

  async undoAction(){
    await this.page
      .frameLocator(elements.FrameLocator)
      .getByRole('button', { name:  elements.undoJsonAction })
      .click();
  }

  async redoAction(){
    await this.page
      .frameLocator(elements.FrameLocator)
      .getByRole('button', { name: elements.redoJsonAction })
      .click();
  }

};