import { step } from "allure-js-commons"
const { expect } = require('@playwright/test');
class BasePage {
   constructor(page) {
      this.page = page;
   }

   async open(url) {
      await step(`Переходим на страницу ${url}`, async () => {
         await this.page.goto(url);
      });
   }
   async waitPageLoaded(locator) {
      await step(`Ожидаем пока локатор ${locator} будет видимым`, async () => {
         await expect(locator).toBeVisible();
      });
   }

   async takeScreenshot(name = 'screenshot.png', path = './test-results/') {
      await step(`Делаем скриншот страницы`, async () => {
         await this.page.screenshot({ path: path + name });
      });
   }

   async getElementText(locator) {
      let text;
      await step(`Получаем текст локатора ${locator}`, async () => {
         text = await locator.textContent();
      });
      return text;
   }

   async checkColor(element, cssProps, rgbColor) {
      await step(`Проверяем цвет ${element}`, async () => {
         await expect(element).toHaveCSS(cssProps, `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`);
      });
   }

   convertHexToRGB(hex) {
      hex = hex.replace(/^#/, '');
      const red = parseInt(hex.substring(0, 2), 16);
      const green = parseInt(hex.substring(2, 4), 16);
      const blue = parseInt(hex.substring(4, 6), 16);

      return {
         red: red,
         green: green,
         blue: blue,
      };
   }

}



export { BasePage }