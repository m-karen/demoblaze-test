// src/pages/HomePage.ts
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object representing the main page.
 */
export class HomePage extends BasePage {
    /**
     * Creates an instance of HomePage.
     * @param page - Playwright Page instance.
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Opens the Home page directly via target URL.
     */
    async open() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    /**
     * Verifies that the Home page has loaded by checking the URL and product grid container.
     */
    async isLoaded() {
        await expect(this.page).toHaveURL(/.*demoblaze\.com/);
        // Verify that the product grid has loaded
        await expect(this.page.locator('#tbodyid')).toBeVisible();
    }

    /**
     * Clicks on a specific product from the main catalog by name.
     * @param productName - Visible title of the product to select.
     */
    async selectProduct(productName: string) {
        // Dynamically select a product by text with auto-waiting for rendering
        await this.page.locator('.hrefch', { hasText: productName }).click();
    }
}