// src/pages/CartPage.ts
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object representing the Cart page.
 */
export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Verifies that the Cart page is loaded by checking the URL and table element visibility.
     */
    async isLoaded() {
        await expect(this.page).toHaveURL(/.*cart\.html.*/);
        await expect(this.page.locator('.table')).toBeVisible();
    }

    /**
     * Verifies that a row containing the specified product name exists in the cart table.
     * @param productName - Name of the product to check in the cart.
     */
    async verifyProductInCart(productName: string) {
        // Waiting for a row with the product name to appear in the cart table
        const productRow = this.page.locator('#tbodyid tr', { hasText: productName });
        await expect(productRow).toBeVisible();
    }
}