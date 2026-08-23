// src/pages/ProductDetailPage.ts
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object representing the Product Detail page.
 */
export class ProductDetailPage extends BasePage {
    /**
     * Creates an instance of ProductDetailPage.
     * @param page - Playwright Page instance.
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Verifies that the Product Detail page is loaded by checking URL pattern and product title visibility.
     */
    async isLoaded() {
        await expect(this.page).toHaveURL(/.*prod\.html.*/);
        await expect(this.page.locator('.name')).toBeVisible();
    }

    /**
     * Asserts that the displayed product title matches the expected name.
     * @param expectedName - Expected title text of the product.
     */
    async verifyProductName(expectedName: string) {
        await expect(this.page.locator('.name')).toHaveText(expectedName);
    }

    /**
     * Clicks the 'Add to cart' button, captures the native browser confirmation alert, and accepts it.
     */
    async addToCart() {
        // Attaching an event listener to the dialog before the click itself
        const dialogPromise = this.page.waitForEvent('dialog');
        
        await this.page.locator('a', { hasText: 'Add to cart' }).click();
        
        // Processing captured dialog
        const dialog = await dialogPromise;
        expect(dialog.message()).toBe('Product added');
        await dialog.accept();
    }
}