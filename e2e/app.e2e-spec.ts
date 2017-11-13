import { AndelaIntermediateTask } from './app.po';

describe('andela-intermediate-task App', () => {
  let page: AndelaIntermediateTask;

  beforeEach(() => {
    page = new AndelaIntermediateTask();
  });

  it('should display the navbar correctly', () => {
    page.navigateTo();
    expect(page.getNavbarElement(0)).toEqual('Home');
    expect(page.getNavbarElement(1)).toEqual('Cats');
    expect(page.getNavbarElement(2)).toEqual('Students');
    expect(page.getNavbarElement(3)).toEqual('Login');
    expect(page.getNavbarElement(4)).toEqual('Register');
  });
});
