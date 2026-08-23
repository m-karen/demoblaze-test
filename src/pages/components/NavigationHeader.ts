// src/pages/components/NavigationHeader.ts
import { Page } from '@playwright/test';

/**
 * Component representing the shared top navigation header.
 */
export class NavigationHeader {
    /**
     * Creates an instance of NavigationHeader.
     * @param page - Playwright Page instance.
     */
    constructor(private page: Page) {}

    /**
     * Navigates to the Home page by clicking the 'Home' navigation link.
     */
    async goToHome() {
        await this.page.locator('.nav-link', { hasText: 'Home' }).click();
    }

    /**
     * Navigates to the Cart page by clicking the 'Cart' navigation link.
     */
    async goToCart() {
        // Demoblaze uses id="cartur" for the cart link
        await this.page.locator('#cartur').click();
    }
}