// tests/demoblaze-shopping.spec.ts
import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { ProductDetailPage } from '../src/pages/ProductDetailPage';
import { CartPage } from '../src/pages/CartPage';

test.describe('Nákupní proces Demoblaze', () => {
    test('E2E workflow - Přidání Nokia lumia 1520 do košíku', async ({ page }) => {
        const productName = 'Nokia lumia 1520';

        // 1. Otevření webu
        const homePage = new HomePage(page);
        await homePage.open();
        await homePage.isLoaded();

        // 2. Výběr produktu
        await homePage.selectProduct(productName);

        // 3. Detail produktu
        const productDetailPage = new ProductDetailPage(page);
        await productDetailPage.isLoaded();
        await productDetailPage.verifyProductName(productName);

        // 4. Přidání do košíku
        await productDetailPage.addToCart();

        // 5. Přechod do košíku (využití sdílené komponenty header)
        await productDetailPage.header.goToCart();

        // 6. Ověření košíku
        const cartPage = new CartPage(page);
        await cartPage.isLoaded();
        await cartPage.verifyProductInCart(productName);
    });
});