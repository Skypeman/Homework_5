import { step } from "allure-js-commons"

class NavigationMenu {
   constructor(page) {
      this.page = page;
      this.searchButton = this.page.locator('.header-top button[aria-label="Поиск"]');
      this.searchField = this.page.locator('.popup-search input[placeholder="Что вы ищете?"]');
   }
   async openSearchModal() {
      await step(`Открываем модальное окно поиска`, async () => {
         await this.searchButton.click();
      });
   }
}

export { NavigationMenu }