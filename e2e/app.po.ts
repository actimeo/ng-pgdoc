import { browser, element, by } from 'protractor';

export class Ng2Pgdoc2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pr-root h1')).getText();
  }
}
