import { CalendarAppPage } from './app.po';

describe('calendar-app App', function() {
  let page: CalendarAppPage;

  beforeEach(() => {
    page = new CalendarAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
