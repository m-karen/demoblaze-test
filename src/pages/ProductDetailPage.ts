// src/pages/ProductDetailPage.ts
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async isLoaded() {
        await expect(this.page).toHaveURL(/.*prod\.html.*/);
        await expect(this.page.locator('.name')).toBeVisible();
    }

    async verifyProductName(expectedName: string) {
        await expect(this.page.locator('.name')).toHaveText(expectedName);
    }

    async addToCart() {
        // Navázání event listeneru na dialog před samotným kliknutím
        const dialogPromise = this.page.waitForEvent('dialog');
        
        await this.page.locator('a', { hasText: 'Add to cart' }).click();
        
        // Zpracování zachyceného dialogu
        const dialog = await dialogPromise;
        expect(dialog.message()).toBe('Product added.');
        await dialog.accept();
    }
}