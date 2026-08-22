// src/pages/CartPage.ts
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async isLoaded() {
        await expect(this.page).toHaveURL(/.*cart\.html.*/);
        await expect(this.page.locator('.table')).toBeVisible();
    }

    async verifyProductInCart(productName: string) {
        // Čeká na to, až se v tabulce košíku objeví řádek s názvem produktu
        const productRow = this.page.locator('#tbodyid tr', { hasText: productName });
        await expect(productRow).toBeVisible();
    }
}