//@ts-check
const { test, expect } = require('@playwright/test');
import { step } from "allure-js-commons"
import { App } from '../src/pages/index.js'

test.describe('Модуль Поиск', async () => {
   let app;
   let query = 'Пушкин';

   test.beforeEach('Открываем модалку поиска', async ({ page }) => {
      app = new App(page);
      await app.basePage.open('/');
      await app.navBar.openSearchModal();
   });

   test('Поиск по запросу через меню выдаёт корректные результаты', async ({ page }) => {
      await app.searchModal.search(query);

      await app.searchPage.waitSearchResult();
      const searchResultNames = await app.searchPage.getSearchResultNamesList();

      await step('Проверяем что в результатах есть искомый запрос', async () => {
         expect(searchResultNames[0]).toContain(query);
      });
      await app.searchPage.takeScreenshot('test-1.png');
   });

   test('Поиск по запросу через меню выдаёт корректный URL', async ({ page }) => {
      await app.searchModal.search(query);

      await app.searchPage.waitSearchResult();

      await step('Проверяем что в URL есть искомый запрос', async () => {
         expect(page.url()).toContain(encodeURI(query));
      });

      await app.searchPage.takeScreenshot('test-2.png');
   });

   test('Повторный поиск по запросу через меню выдаёт корректные результаты', async ({ page }) => {
      await app.searchModal.search(query);
      await app.searchPage.waitSearchResult();

      query = 'Италия';
      await app.navBar.openSearchModal();
      await app.searchModal.search(query);
      await app.searchPage.waitSearchResult();
      const searchResultNames = await app.searchPage.getSearchResultNamesList();

      await step('Проверяем что в результатах есть искомый запрос', async () => {
         expect(searchResultNames[0]).toContain(query);
      });

      await app.searchPage.takeScreenshot('test-3.png');
   });

   test('Повторный поиск по запросу через меню выдаёт корректный URL', async ({ page }) => {
      await app.searchModal.search(query);
      await app.searchPage.waitSearchResult();

      query = 'Италия';
      await app.navBar.openSearchModal();
      await app.searchModal.search(query);
      await app.searchPage.waitSearchResult();

      await step('Проверяем что в URL есть искомый запрос', async () => {
         expect(page.url()).toContain(encodeURI(query));
      });

      await app.searchPage.takeScreenshot('test-4.png');
   });

   test('Кнопка "поиск" недоступна при пустом поле поиска', async ({ page }) => {
      let modalSearchButton = await app.searchModal.searchButton;

      await app.searchModal.waitPageLoaded(modalSearchButton);
      await app.searchModal.takeScreenshot('test-5.png');
      await step('Првоеряем что кнопка недоступна', async () => {
         await expect(modalSearchButton).toBeDisabled();
      });
   });

   test('Граница инпута при :focus состоянии имеет корректный цвет', async ({ page }) => {
      let modalSearchField = await app.searchModal.searchField;
      let hexColor = '#b4966e';
      let rgbColor = app.searchModal.convertHexToRGB(hexColor);

      await app.searchModal.waitPageLoaded(modalSearchField);
      await app.searchModal.focusSearchField();
      await app.searchModal.takeScreenshot('test-6.png');

      await app.searchModal.checkColor(modalSearchField, 'border-color', rgbColor);
   });
});