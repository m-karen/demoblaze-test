// tests/demoblaze-shopping.spec.ts
import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { ProductDetailPage } from '../src/pages/ProductDetailPage';
import { CartPage } from '../src/pages/CartPage';

/**
 * @fileoverview End-to-end test suite verifying the Demoblaze purchasing workflow.
 */

test.describe('Demoblaze purchasing process', () => {
    /**
     * Complete E2E workflow testing the product selection, detail verification, adding to cart, and cart contents validation.
     */
    test('E2E workflow - Adding a product to cart', async ({ page }) => {
        const productName = 'Nokia lumia 1520';

        // 1. Opening the website
        const homePage = new HomePage(page);
        await homePage.open();
        await homePage.isLoaded();

        // 2. Product selection
        await homePage.selectProduct(productName);

        // 3. Product detail
        const productDetailPage = new ProductDetailPage(page);
        await productDetailPage.isLoaded();
        await productDetailPage.verifyProductName(productName);

        // 4. Adding to cart
        await productDetailPage.addToCart();

        // 5. Navigating to the cart (using the shared header component)
        await productDetailPage.header.goToCart();

        // 6. Cart verification
        const cartPage = new CartPage(page);
        await cartPage.isLoaded();
        await cartPage.verifyProductInCart(productName);
    });
});