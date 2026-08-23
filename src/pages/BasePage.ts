// src/pages/BasePage.ts
import { Page } from '@playwright/test';
import { NavigationHeader } from './components/NavigationHeader';

/**
 * Abstract base class for Page Objects, providing common components and page state guarantees.
 */
export abstract class BasePage {
    /** Component representing the navigation header present on all pages. */
    public readonly header: NavigationHeader;

    /**
     * Creates an instance of BasePage.
     * @param page - Playwright Page instance.
     */
    constructor(protected page: Page) {
        this.header = new NavigationHeader(page);
    }

    /**
     * Page Guard method ensuring the page is fully loaded and ready for interaction.
     * Must be implemented by every extending page object class.
     * @returns Promise that resolves when load verification passes.
     */
    abstract isLoaded(): Promise<void>;
}