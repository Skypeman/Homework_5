import { BasePage } from "./base.page";
import { step } from "allure-js-commons"

class SearchPage extends BasePage {
   constructor(page) {
      super(page);
      this.searchResultList = this.page.locator('div .result-item');
      this.searchResultNamesList = this.page.locator('div .result__name');
   }

   async waitSearchResult() {
      await step(`Ждём загрузку результатов поиска`, async () => {
         await this.waitPageLoaded(this.searchResultList.first());
      });
   }

   async getSearchResultNamesList() {
      let nameList = [];
      await step(`Заносим заголовки результатов поиска в массив`, async () => {
         for await (const locator of await this.searchResultNamesList.all()) {
            let name = await this.getElementText(locator);
            nameList.push(name);
         };
      });
      return nameList;
   }



}
export { SearchPage }