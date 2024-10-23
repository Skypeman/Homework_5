import { BasePage, SearchModal, NavigationMenu, SearchPage } from './index'
class App {
   constructor(page) {
      this.page = page;
      this.basePage = new BasePage(page);
      this.searchModal = new SearchModal(page);
      this.navBar = new NavigationMenu(page);
      this.searchPage = new SearchPage(page);
   }
};

export { App };
