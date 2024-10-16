import { BasePage } from "./base.page";
import { step } from "allure-js-commons"

class SearchModal extends BasePage {
   constructor(page) {
      super(page);
      this.searchField = this.page.locator('.popup-search input[placeholder="Что вы ищете?"]');
      this.searchButton = this.page.locator('button.popup-search__btn[aria-label="Поиск"]')
   }

   async focusSearchField() {
      await step(`Переводим инпут в активное состояние`, async () => {
         await this.searchField.click();
      });
   }
   async search(query) {
      await step(`Производим поиск по запросу ${query}`, async () => {
         await this.focusSearchField();
         await this.searchField.fill(query);
         await this.page.waitForTimeout(300);
         await this.searchField.press('Enter');
      });
   }
}
export { SearchModal }