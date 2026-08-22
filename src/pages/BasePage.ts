// src/pages/BasePage.ts
import { Page } from '@playwright/test';
import { NavigationHeader } from './components/NavigationHeader';

export abstract class BasePage {
    public readonly header: NavigationHeader;

    constructor(protected page: Page) {
        this.header = new NavigationHeader(page);
    }

    // Abstraktní metoda vynucující implementaci Page Guardu u každé stránky
    abstract isLoaded(): Promise<void>;
}