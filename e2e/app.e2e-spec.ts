import { Ng2Pgdoc2Page } from './app.po';

describe('ng2-pgdoc2 App', function() {
  let page: Ng2Pgdoc2Page;

  beforeEach(() => {
    page = new Ng2Pgdoc2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('pr works!');
  });
});
