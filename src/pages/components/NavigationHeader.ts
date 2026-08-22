// src/pages/components/NavigationHeader.ts
import { Page } from '@playwright/test';

export class NavigationHeader {
    constructor(private page: Page) {}

    async goToHome() {
        await this.page.locator('.nav-link', { hasText: 'Home' }).click();
    }

    async goToCart() {
        // Demoblaze používá id="cartur" pro odkaz do košíku
        await this.page.locator('#cartur').click();
    }
}