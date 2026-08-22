// src/pages/HomePage.ts
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async open() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    async isLoaded() {
        await expect(this.page).toHaveURL(/.*demoblaze\.com/);
        // Ověření, že se načetla mřížka produktů
        await expect(this.page.locator('#tbodyid')).toBeVisible();
    }

    async selectProduct(productName: string) {
        // Dynamický výběr produktu podle textu s auto-waitingem na vykreslení
        await this.page.locator('.hrefch', { hasText: productName }).click();
    }
}